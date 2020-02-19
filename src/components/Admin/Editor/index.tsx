import { h, Component } from 'preact';
import { parsePageContent } from '~/lib/parsers';
import MetaForm from './MetaForm';

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

	Editor!: typeof import('./CodeEditor').default;

	state: State = {
		loading: 'Loading editor ...'
	};

	componentDidMount() {
		Promise.all([
			tryGetContent(this.props.path),
			import(/* webpackChunkName: "editor" */ './CodeEditor')
		])
		.then(([ content, m ]) => {
			this.Editor = m.default;
			this.setState({ loading: '', content });
		});
	}

	componentWillReceiveProps({ path }: Props) {
		if (path !== this.props.path) {
			tryGetContent(path).then(
				content => this.setState({ content })
			);
		}
	}

	onInput = ({ value }: { value: string }) => {
		if (this.state.content) {
			this.setState({
				content: {
					...this.state.content,
					content: value
				}
			});
		}
	}

	render(_: Props, { loading, content }: State) {

		if (loading) {
			return (
				<div>{loading}</div>
			);
		}

		return (
			<div>
				<MetaForm content={content || {}} />
				<this.Editor onInput={this.onInput} value={content!.content} />
			</div>
		);
	}
}
