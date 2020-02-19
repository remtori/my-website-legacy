import { h, Component, RenderableProps } from 'preact';
import cx from '~/lib/cx';

import * as codemirror from 'codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/addon/comment/comment';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';

import styles from './CodeEditor.scss';

interface Props {
	value?: string;
	onInput?: (v: { value: string }) => void;
	class?: string;
}

export default class Editor extends Component<Props> {

	editor?: codemirror.Editor;
	value?: string;

	componentDidMount() {
		const { value } = this.props;
		this.editor = codemirror(this.base as HTMLElement, {
			value: String(value || ''),
			mode: 'text/x-markdown',
			theme: 'darcula',
			viewportMargin: Infinity,
			lineWrapping: true,
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 2,
			indentUnit: 2,
			showCursorWhenSelecting: true,
			extraKeys: {
				'Cmd-/': 'toggleComment'
			}
		});

		this.editor.on('change', () => {
			this.value = this.editor!.getValue();
			const { onInput } = this.props;
			if (onInput) onInput({ value: this.value });
		});
	}

	componentWillReceiveProps({ value }: Props) {
		const current = this.hasOwnProperty('value') ? this.value : this.props.value;
		if (value !== current) {
			this.editor!.setValue(value || '');
			setTimeout(() => this.editor!.refresh(), 1);
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillUnmount() {
		const wrapper = this.editor && this.editor.getWrapperElement();
		if (wrapper) this.base!.removeChild(wrapper);
		this.editor = undefined;
	}

	render({ onInput, value, ...props }: RenderableProps<Props>) {
		return <div {...props} class={cx(styles.codeEditor, props.class)} />;
	}
}
