// minimal yaml parser

export default function parse<T extends object>(text: string): T {
	return Object.fromEntries(
		text.split('\n').map(kv => kv.split(': '))
	);
}
