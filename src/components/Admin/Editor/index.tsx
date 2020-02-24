import { h, Component } from 'preact';
import { parsePageContent } from '~/lib/parsers';

export type ContentData = PageContent & { new?: boolean };

function genContent(path?: string): ContentData {
	const title = path || `Title no #${Date.now()}`;
	const created = new Date().toISOString();
	return {
		new: true,
		id: title,
		title,
		content: '',
		author: 'Anon',
		tags: '',
		created,
		modified: created,
		isFullPage: false
	};
}

function tryGetContent(path?: string) {

	if (!path) return Promise.resolve(genContent());

	return fetch(path)
		.then(
			r => r.text()
		)
		.then(
			content => ({
				...parsePageContent(content),
				id: path.slice(path.lastIndexOf('/') + 1, path.lastIndexOf('.md'))
			})
		).catch(
			() => genContent(path)
		);
}

interface Props {
	path?: string;
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
			tryGetContent(this.props.path),
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

	componentWillReceiveProps({ path }: Props) {
		if (path !== this.props.path) {
			tryGetContent(path).then(
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
