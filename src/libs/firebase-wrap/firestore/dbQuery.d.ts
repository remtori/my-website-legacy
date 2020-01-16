export type FSQuery = { startAfter?: string, tag?: string };
export function getBlog(id: string): Promise<Blog>;
export function makeQuery(opts?: FSQuery): Promise<Blog[]>;
