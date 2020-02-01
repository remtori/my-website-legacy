namespace preact.JSX
{
	interface HTMLAttributes {
		dangerouslySetInnerHTML?: { __html: string };
	}
}

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
