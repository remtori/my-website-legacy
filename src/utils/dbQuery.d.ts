export function getBlog(id: string): Promise<Blog>;
export function makeQuery(opts: { startAfter?: string, tag?: string }): Promise<Blog[]>;
