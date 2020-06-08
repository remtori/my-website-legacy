import { h, Component } from 'preact';
import { parsePageContent } from '~/lib/parsers';

function getIdFromPath(p: string) {
	const i = p.lastIndexOf('.md');
	return p.slice(p.lastIndexOf('/') + 1, i >= 0 ? i : undefined);
}

function genContent(page: string = ''): ContentData {
	const title = (page && getIdFromPath(page)) || `Title no #${Date.now()}`;
	const created = new Date().toISOString();
	const r = /^\/content\/(\w+)(\/\w+)?\/.+\.(\w+)$/.exec(page) || [];
	return {
		new: true,
		id: title,
		lang: r[1] as ContentLang || 'en',
		type: r[2] as ContentType || '/',
		ext: r[3] || 'md',
		title,
		content: '',
		author: 'Anon',
		tags: '',
		created,
		modified: created,
		isFullPage: false
	};
}

function tryGetContent(page?: string): Promise<ContentData> {

	if (!page) return Promise.resolve(genContent());

	return fetch(page)
		.then(
			r => r.text()
		)
		.then(
			content => ({
				...genContent(page),
				...parsePageContent(content)
			})
		).catch(
			() => genContent(page)
		);
}

interface Props {
	page?: string;
}

interface State {
	loading: string;
	content?: ContentData;
}

export default class ContentEditor extends Component<Props, State> {

	PageForm!: typeof import('./PageForm').default;

	state: State = {
		loading: 'Loading editor ...'
	};

	componentDidMount() {
		Promise.all([
			tryGetContent(this.props.page),
			import('./PageForm')
		])
		.then(([content, m]) => {

			this.PageForm = m.default;

			this.setState({
				loading: '',
				content
			});
		});
	}

	componentWillReceiveProps({ page }: Props) {
		if (page !== this.props.page) {
			tryGetContent(page).then(
				content => this.setState({ content })
			);
		}
	}

	onSubmit = (values: PageContent) => {
		return Promise.resolve().then(() => {
			console.log(values);
		});
	}

	render(_: Props, { loading, content }: State) {

		if (loading) {
			return (
				<div>{loading}</div>
			);
		}

		return (
			<this.PageForm onSubmit={this.onSubmit} content={content || {}} />
		);
	}
}
