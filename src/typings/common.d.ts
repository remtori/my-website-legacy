type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

declare var process: { env: { NODE_ENV: string; } }
declare var PRERENDER: boolean;
declare var module: { exports: any; }
declare function require(s: string): void;

declare interface Blog
{
	author: string;
	description: string;
	key: string;
	public: boolean;
	previewImg: {
		url: string;
		width: number;
		height: number;
	};
	tags: string[];
	title: string;
	timestamp: string;
	shouldWrapContent?: boolean;
}

declare interface User
{
	displayName: string;
	isStaff: boolean;
	isAdmin: boolean;
	photoURL: string;
	uid: string;
	email: string;
	credential: firebase.auth.AuthCredential | null;
}
