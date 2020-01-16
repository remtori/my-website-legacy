import { makeQuery } from '~/libs/firebase-wrap/firestore/dbQuery';

it('should return valid JSON', () =>
{
	expect(() => JSON.parse(makeQuery())).not.toThrow();
});

it('should construct correct query for 0 arg', () =>
{
	expect(JSON.parse(makeQuery())).toEqual({
		structuredQuery: {
			from: [{ collectionId: 'blogs' }],
			where: {
				compositeFilter: {
					op: 'AND',
					filters: [{
						fieldFilter: {
							field: { fieldPath: 'public' },
							op: 'EQUAL',
							value: { booleanValue: true }
						}
					}]
				}
			},
			orderBy: [{
				field: { fieldPath: 'key' },
				direction: 'ASCENDING'
			}, {
				field: { fieldPath: '__name__' },
				direction: 'ASCENDING'
			}],
			limit: 25
		}
	});
});

it('should construct correct query for 1st arg', () =>
{
	expect(JSON.parse(makeQuery('__AAA__'))).toEqual({
		structuredQuery: {
			from: [{ collectionId: 'blogs' }],
			where: {
				compositeFilter: {
					op: 'AND',
					filters: [{
						fieldFilter: {
							field: { fieldPath: 'public' },
							op: 'EQUAL',
							value: { booleanValue: true }
						}
					}]
				}
			},
			orderBy: [{
				field: { fieldPath: 'key' },
				direction: 'ASCENDING'
			}, {
				field: { fieldPath: '__name__' },
				direction: 'ASCENDING'
			}],
			limit: 25,
			startAt: {
				before: false,
				values: [{ stringValue: '__AAA__' }]
			}
		}
	});
});

it('should construct correct query for 1st arg', () =>
{
	expect(JSON.parse(makeQuery(undefined, '__TAG__'))).toEqual({
		structuredQuery: {
			from: [{ collectionId: 'blogs' }],
			where: {
				compositeFilter: {
					op: 'AND',
					filters: [{
						fieldFilter: {
							field: { fieldPath: 'public' },
							op: 'EQUAL',
							value: { booleanValue: true }
						}
					}, {
						fieldFilter: {
							field: { fieldPath: 'tags' },
							op: 'ARRAY_CONTAINS',
							value: { stringValue: '__TAG__' }
						}
					}]
				}
			},
			orderBy: [{
				field: { fieldPath: 'key' },
				direction: 'ASCENDING'
			}, {
				field: { fieldPath: '__name__' },
				direction: 'ASCENDING'
			}],
			limit: 25
		}
	});
});

it('should construct correct query for 2 argument', () =>
{
	expect(JSON.parse(makeQuery('__AAA__', '__TAG__'))).toEqual({
		structuredQuery: {
			from: [{ collectionId: 'blogs' }],
			where: {
				compositeFilter: {
					op: 'AND',
					filters: [{
						fieldFilter: {
							field: { fieldPath: 'public' },
							op: 'EQUAL',
							value: { booleanValue: true }
						}
					}, {
						fieldFilter: {
							field: { fieldPath: 'tags' },
							op: 'ARRAY_CONTAINS',
							value: { stringValue: '__TAG__' }
						}
					}]
				}
			},
			orderBy: [{
				field: { fieldPath: 'key' },
				direction: 'ASCENDING'
			}, {
				field: { fieldPath: '__name__' },
				direction: 'ASCENDING'
			}],
			limit: 25,
			startAt: {
				before: false,
				values: [{ stringValue: '__AAA__' }]
			}
		}
	});
});
