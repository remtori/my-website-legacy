import { Component, AnyComponent } from "preact";

export default class Hydrator extends Component<{
	wrapperProps?: {
		[key: string]: any;
	},
	component?: ComponentConstructor;
	load?: () => ComponentConstructor;
	boot?: boolean;
	[key: string]: any;
}>{};
