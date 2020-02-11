import * as admin from 'firebase-admin';
import updatePerm from './updatePermWithChanges';

const consoleLog = console.log;

beforeAll(() => {
	(console as any).log = () => void 0;
});

afterAll(() => {
	(console as any).log = consoleLog;
});

beforeEach(() => {
	(admin as any).controller.clearClaims();
});

const { getClaims } = (admin as any).controller;

it('should set permission level claims', async () => {
	await updatePerm({}, { level: { a: 1, b: 2, c: 3 } });
	expect(getClaims()).toEqual({
		a: { level: 1 },
		b: { level: 2 },
		c: { level: 3 },
	});
});

it('should override permission level claims', async () => {
	await updatePerm({}, { level: { a: 1, b: 2, c: 3 } });

	await updatePerm(
		{ level: { a: 1, b: 2, c: 3 } },
		{ level: { a: 3, b: 4, c: 3 } }
	);

	expect(getClaims()).toEqual({
		a: { level: 3 },
		b: { level: 4 },
		c: { level: 3 },
	});
});


it('should reset permission level claims', async () => {
	await updatePerm({}, { level: { a: 1, b: 2, c: 3 } });

	await updatePerm(
		{ level: { a: 1, b: 2, c: 3 } },
		{ level: { a: 3, c: 3 } }
	);

	expect(getClaims()).toEqual({
		a: { level: 3 },
		b: { level: 0 },
		c: { level: 3 },
	});
});

it('should reset ALL permission level claims', async () => {
	await updatePerm({}, { level: { a: 1, b: 2, c: 3 } });

	await updatePerm(
		{ level: { a: 1, b: 2, c: 3 } },
		{}
	);

	expect(getClaims()).toEqual({
		a: { level: 0 },
		b: { level: 0 },
		c: { level: 0 },
	});
});
