declare module 'preact-markup' {
	import { h, Component, AnyComponent } from "preact";
	export default class Markup extends Component<
	{
		markup: string;
		wrap?: boolean;
		type?: 'xml' | 'html';
		trim?: boolean | 'all';
		components?: AnyComponent;
		reviver?: typeof h;
		onError?: (e: Error) => void;
		'allow-scripts'?: boolean;
		'allow-events'?: boolean;
	}
	> {};
}

declare module 'highlight.js/lib/highlight.js' {
	export const highlightAuto: (s: string) => ({ value: string });
	export const registerLanguage: (l: string, f: any) => void;
}
