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

it('should add ADMIN claims', async () => {
	await updatePerm({}, { admin: [ 'a', 'b', 'c' ] });
	expect(getClaims()).toEqual({
		a: { admin: true },
		b: { admin: true },
		c: { admin: true },
	});
});

it('should add STAFF claims', async () => {
	await updatePerm({}, { staff: [ 'a', 'b', 'c' ] });
	expect(getClaims()).toEqual({
		a: { staff: true },
		b: { staff: true },
		c: { staff: true },
	});
});

it('should add ADMIN and STAFF claims', async () => {
	await updatePerm({}, { admin: [ 'a', 'b', 'c' ], staff: [ 'b', 'e', 'f' ] });
	expect(getClaims()).toEqual({
		a: { admin: true },
		b: { staff: true },
		c: { admin: true },
		e: { staff: true },
		f: { staff: true },
	});
});

it('should remove ADMIN claims', async () => {
	await (updatePerm({}, {
		admin: [ 'a', 'b', 'c', 'x', 'y', 'z' ],
		staff: [ 'd', 'e', 'f' ],
	}));

	await updatePerm({
		admin: [ 'a', 'b', 'c', 'x', 'y', 'z' ],
		staff: [ 'd', 'e', 'f' ],
	}, {
		admin: [ 'a', 'b', 'c' ],
		staff: [ 'd', 'e', 'f' ]
	});

	expect(getClaims()).toEqual({
		a: { admin: true },
		b: { admin: true },
		c: { admin: true },
		d: { staff: true },
		e: { staff: true },
		f: { staff: true },
		x: { admin: false },
		y: { admin: false },
		z: { admin: false },
	});
});


it('should remove STAFF claims', async () => {
	await (updatePerm({}, {
		admin: [ 'a', 'b', 'c'],
		staff: [ 'd', 'e', 'f', 'x', 'y', 'z'  ],
	}));

	await updatePerm({
		admin: [ 'a', 'b', 'c'],
		staff: [ 'd', 'e', 'f', 'x', 'y', 'z'  ],
	}, {
		admin: [ 'a', 'b', 'c' ],
		staff: [ 'd', 'e', 'f' ]
	});

	expect(getClaims()).toEqual({
		a: { admin: true },
		b: { admin: true },
		c: { admin: true },
		d: { staff: true },
		e: { staff: true },
		f: { staff: true },
		x: { staff: false },
		y: { staff: false },
		z: { staff: false },
	});
});


it('should remove ADMIN and STAFF claims', async () => {
	await (updatePerm({}, {
		admin: [ 'a', 'b', 'c', 'x'],
		staff: [ 'd', 'e', 'f', 'y', 'z'  ],
	}));

	await updatePerm({
		admin: [ 'a', 'b', 'c', 'x'],
		staff: [ 'd', 'e', 'f', 'y', 'z'  ],
	}, {
		admin: [ 'a', 'b', 'c' ],
		staff: [ 'd', 'e', 'f' ]
	});

	expect(getClaims()).toEqual({
		a: { admin: true },
		b: { admin: true },
		c: { admin: true },
		d: { staff: true },
		e: { staff: true },
		f: { staff: true },
		x: { admin: false },
		y: { staff: false },
		z: { staff: false },
	});
});
