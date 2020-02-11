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

declare module '*/waifu/waifu-index.json' {
	const content: string[];
	export default content;
}

declare module '*/generated/index.json' {
	const pathToFile: string;
	export default pathToFile;
}
