import { CONFIG } from '../utils';

const primitives = ['stringValue', 'integerValue', 'booleanValue', 'timestampValue'];

function getValue(obj) {
	for (const k of primitives)
		if (obj[k]) return obj[k];

	if (obj.arrayValue) {
		return obj.arrayValue.values.map(getValue);
	} else if (obj.mapValue) {
		const r = {};
		for (const k in obj.mapValue.fields)
			r[k] = getValue(obj.mapValue.fields[k]);

		return r;
	} else {
		return obj;
	}
}

const dbUrl = `https://firestore.googleapis.com/v1/projects/${CONFIG.projectId}/databases/(default)/documents`;

const jsonOrThrow = r => {
	if (r.status !== 200) throw r.json();
	return r.json();
};

export function getBlog(id) {
	return fetch(`${dbUrl}/blogs/${id}`)
		.then(jsonOrThrow)
		.then(({
			fields
		}) => getValue({
			mapValue: {
				fields
			}
		}));
}

export function makeQuery({ startAfter, tag } = {}) {

	let query = `{"structuredQuery":{"from":[{"collectionId":"blogs"}],
		"where":{"compositeFilter":{"op":"AND","filters":[
		{"fieldFilter":{"field":{"fieldPath":"public"},"op":"EQUAL","value":{"booleanValue":true}}}`;

	if (tag != null) {
		query += `,{"fieldFilter":{"field":{"fieldPath":"tags"},"op":"ARRAY_CONTAINS","value":{"stringValue":"${tag}"}}}`;
	}

	query += `]}},"orderBy":[{"field":{"fieldPath":"timestamp"},"direction":"DESCENDING"},{"field":{"fieldPath":"__name__"},"direction":"DESCENDING"}],"limit":10`;

	if (startAfter != null) {
		query += `,"startAt":{"before":false,"values":[{"timestampValue":"${startAfter}"}]}`;
	}

	query += `}}`;

	return fetch(`${dbUrl}:runQuery`, {
		method: 'POST',
		body: query,
	}).then(jsonOrThrow).then(arr => {
		if (!arr[0].document) return [];

		return arr.map(({
			document: {
				fields
			}
		}) => getValue({
			mapValue: {
				fields
			}
		}))
	});
}