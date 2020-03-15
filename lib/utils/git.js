const path = require('path');
const fetch = require('node-fetch');
const { execute } = require('./shell');
const config = require('../../config');

const langs = Object.keys(
	require(path.join(config.contentDir, './lang.json'))
);

// List of all the "content" that has changed
function contentDiff(prevHash) {

	const updatedFiles = [];
	const removedFiles = [];

	return execute(`git diff --name-status ${prevHash}`).then(diffs => {
		diffs.split('\n')
			.map(
				s => /^[AMD]\tcontent\/(\w+)\/(.+)/.exec(s)
			)
			.filter(r => r && langs.includes(r[1]))
			.forEach(
				({ input: p, 1: lang, 2: content }) => (
					p[0] !== 'D'
					? updatedFiles
					: removedFiles
				).push({
					url: p.slice(2),
					lang,
					content: '/' + content,
				})
			);

		return { updatedFiles, removedFiles };
	});
}

function getFileMeta(filePath) {
	return fetch(`https://api.github.com/graphql`, {
		method: "POST",
		headers: {
			'Authorization': `bearer ${process.env.GITHUB_TOKEN}`
		},
		body: JSON.stringify({
			query: `{ repository(owner: "remtori", name: "my-website") {
				ref(qualifiedName: "refs/heads/master") {
					target {... on Commit {
						history(first: 1, path: "${filePath}") {
							edges { node {
								committedDate
								author { name }
							}}
						}
					}}
				}
			}}
		`})
	}).then(r => r.json()).then(r => {
		try {
			const node = r.data.repository.ref.target.history.edges[0].node;
			return {
				committedDate: node.committedDate,
				authorName: node.author.name,
			};
		}
		catch(e) {
			console.log(`Parse Github data error while getting "${filePath}" metadata:`);
			console.log(JSON.stringify(r, null, 2));
			console.log(e);

			return {
				authorName: 'Remtori',
				committedDate: new Date(0).toISOString(),
			};
		}
	});
}

async function pushToGithub() {
	console.log(await execute(`sh ${path.join(config.rootDir, './lib/utils/push.sh')}`));
}

module.exports = {
	contentDiff,
	getFileMeta,
	pushToGithub,
};
