const config: ConfigType = {
	title: "Remtori's Comfy Home",
	description: 'A comfy place with a lot of cool stuff to looking at/for',
	languages: {
		en: 'English',
		vn: 'Tiếng Việt'
	}
};

interface ConfigType {
	title: string;
	description: string;
	languages: {
		[shorthand: string]: string;
	};
}

export default config;
