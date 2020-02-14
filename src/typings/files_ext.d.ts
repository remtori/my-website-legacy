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

declare module '*.png' {
	const base64EncodeImage: string;
	export default base64EncodeImage;
}

declare module '*/waifu/waifu-index.json' {
	const content: string[];
	export default content;
}

declare module '*/generated/index.json' {
	const pathToFile: string;
	export default pathToFile;
}
