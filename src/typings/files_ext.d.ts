declare module '*.scss' {
	const content: {[className: string]: string};
	export default content;
}

declare module '*.css' {
	const content: {[className: string]: string};
	export default content;
}

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*/indexes.json' {
	const content: Array<string>;
	export default content;
}
