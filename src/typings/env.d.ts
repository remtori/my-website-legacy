declare var process:
{
	env: {
		NODE_ENV: string;
	}
}

declare var PRERENDER: boolean;

declare var module:
{
	exports: any;
}

declare function require(s: string): void;
