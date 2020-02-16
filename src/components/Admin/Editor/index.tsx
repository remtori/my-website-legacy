import { h, Component } from 'preact';

interface Props {
	path?: string;
}

interface State {
	loading: string;
	content: string;
}

export default class ContentEditor extends Component<Props, State> {

	Editor!: typeof import('./CodeEditor').default;

	state = {
		loading: 'Loading editor ...',
		content: ''
	};

	tryGetContent(path?: string) {

		if (!path) return this.setState({ content: '' });

		Promise.resolve(
			localStorage.getItem('__CURRENT_CONTENT_EDIT__') ||
			fetch(path).then(r => r.text())
		).then(
			content => this.setState({ content })
		).catch(
			() => void 0
		);
	}

	componentDidMount() {
		this.tryGetContent(this.props.path);
		import(/* webpackChunkName: "editor" */ './CodeEditor').then(m => {
			this.Editor = m.default;
			this.setState({ loading: '' });
		});
	}

	componentWillReceiveProps({ path }: Props) {
		if (path !== this.props.path) {
			this.tryGetContent(path);
		}
	}

	onInput = ({ value }: { value: string }) => {
		this.setState({ content: value });
	}

	render(_: Props, { loading, content }: State) {

		if (loading) {
			return (
				<div>{loading}</div>
			);
		}

		return (
			<this.Editor onInput={this.onInput} value={content} />
		);
	}
}
