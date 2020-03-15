const fs = require('fs-extra');
const path = require('path');
const yaml = require('yaml');
const config = require('../../config');
const { execute } = require('./shell');
const { contentDiff, getFileMeta } = require('./git');

const strJson = j => JSON.stringify(j, null, 2);
const trimUrl = u => u.replace(/\.md$/, '').replace(/\/index/, '/');

module.exports.genContentData = async function() {

	const head$commit = (await execute(`git rev-parse HEAD`)).replace(/[^\w]/g, '');
	const tail$commit = (await execute(`git rev-list --max-parents=0 master`)).replace(/[^\w]/g, '');

	const db = {
		$commit: tail$commit,
		documents: [],
	};

	const blogIndexPath = path.join(config.contentDir, './index.json');
	if (fs.existsSync(blogIndexPath)) {
		Object.assign(db, require(blogIndexPath));
	}

	const published$commit = db.$commit;

	async function genPatch() {

		console.group(`Generating patch.json with diff from ${published$commit.slice(0, 7)} to ${head$commit.slice(0, 7)}`);

		const { updatedFiles, removedFiles } = await contentDiff(published$commit);

		const getUrlFromContent = p => trimUrl(p.content);
		const isEnglish = p => p.lang === 'en';

		const updatePaths = updatedFiles
			.filter(isEnglish)
			.map(getUrlFromContent);

		const removePaths = removedFiles
			.filter(isEnglish)
			.map(getUrlFromContent);

		console.groupEnd();

		const result = {
			update: updatePaths,
			remove: removePaths,
		};

		await fs.writeFile(path.join(config.contentDir, './patch.json'), strJson(result), 'utf8');

		return result;
	}

	async function genIndex() {

		console.group('Generating index.json');

		let len;
		console.log(`Updating index.json from ${db.$commit.slice(0, 7)} to ${head$commit.slice(0, 7)}`);
		if (db.$commit === head$commit) {
			console.log(`index.json is already up-to-date`);
			console.groupEnd();
			return;
		}

		const { updatedFiles, removedFiles } = await contentDiff(db.$commit);
		db.$commit = head$commit;

		console.log('Getting last modified time of all changed content.');

		const queryResultMap = await Promise.all(
			updatedFiles.map(p => getFileMeta(p.url))
		).then(result => {
			const out = new Map();
			for (let i = 0; i < result.length; i++)
				out.set(updatedFiles[i].url, result[i]);

			return out;
		});

		const uidFromDoc = doc => `${doc.lang}\\\\${trimUrl(doc.content)}`;

		// Filter out removed file
		{
			const uidDocList = db.documents.map(uidFromDoc);
			const blacklist = removedFiles.map(uidFromDoc);

			len = db.documents.length;
			db.documents = db.documents.filter((_, i) => blacklist.indexOf(uidDocList[i]) === -1);
			console.log(`Update database, ${len - db.documents.length}/${removedFiles.length} document removed`);
		}

		// Create/Update the document
		{
			const uidDocList = db.documents.map(uidFromDoc);
			const whitelist = updatedFiles.map(uidFromDoc);

			let updateCount = 0;
			for (let i = 0; i < updatedFiles.length; i++) {

				const j = uidDocList.indexOf(whitelist[i]);

				if (j >= 0) {
					db.documents[j] = await updateDBDoc(queryResultMap, updatedFiles[i], db.documents[j]);
					updateCount++;
				} else {
					const doc = await updateDBDoc(queryResultMap, updatedFiles[i]);
					db.documents.push(doc);
				}
			}

			console.log(`Update database, ${updateCount} document updated`);
			console.log(`Update database, ${updatedFiles.length - updateCount} document created`);
		}

		// Sort the document descending by created time
		db.documents.sort((a, b) => a.created > b.created ? -1 : 1);
		await fs.writeFile(blogIndexPath, strJson(db), 'utf8');

		console.log(`Generated index.json with ${db.documents.length} document`);
		console.groupEnd();
	}

	await genIndex();
	const patch = await genPatch();

	return {
		patch,
		index: db,
	}
}

async function updateDBDoc(queryResultMap, fileMeta, oldDoc) {

	let { lang, content } = fileMeta;
	content = trimUrl(content);
	const id = path.parse(fileMeta.url).name;

	let queryResult = queryResultMap.get(fileMeta.url);
	if (!queryResult) {
		console.log(`Error: Can not find metadata of: `, fileMeta.url);
		queryResult = {
			authorName: 'Remtori',
			committedDate: new Date(0).toISOString(),
		};
	}

	let doc = {
		id,
		lang,
		content,
		title: id,
		description: '',
		tags: '',
		author: queryResult.authorName,
		created: queryResult.committedDate,
		modified: queryResult.committedDate,
	};

	const sourceData = await fs.readFile(path.join(config.rootDir, fileMeta.url), 'utf8');
	const docSource = (/^\s*---\n\s*([\s\S]*?)\s*\n---\n/i.exec(sourceData) || [])[1];

	return Object.assign(
		{},
		doc,
		docSource && yaml.parse('---\n' + docSource.replace(/^/gm, '  ') + '\n'),
		// These value can't be update
		oldDoc && {
			created: oldDoc.created,
		},
		{
			id,
			lang,
			content,
		}
	);
}
