type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare var process: { env: { NODE_ENV: 'production' | 'development'; } }
declare var __PRERENDER__: boolean;
declare var __VERSION__: string;
declare var __CONTENT_ROOT_DIR__: string;
declare var module: { exports: any; }
declare var require: any;
declare var __non_webpack_require__: any;

declare interface PageContent
{
	id: string;
	content: string;
	title: string;
	description?: string;
	author: string;
	tags: string;
	previewImg?: {
		url: string;
		width: number;
		height: number;
	};
	created: string;
	isFullPage?: boolean;
}


declare type ContentType = '/' | '/blogs' | '/projects';
declare type ContentLang = 'en' | 'vn';

declare type ContentData = PageContent & {
	new?: boolean;
	type: ContentType;
	lang: ContentLang;
	ext: string;
};

declare interface User
{
	displayName: string;
	level: number;
	photoURL: string;
	uid: string;
	email: string;
	credential: { accessToken: string } | null;
}
