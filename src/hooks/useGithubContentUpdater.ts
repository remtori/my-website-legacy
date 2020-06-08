function jsonToYaml(o: object): string {
	return '';
}

export function updateFile(data: ContentData): Promise<void> {
	const { lang, type, ext, content, ...inlineDat } = data;
	const formattedContent = `---\n${jsonToYaml(inlineDat)}\n---${content}`;
	// query {
	// 	repository(owner: "remtori", name: "my-website") {
	// 		  object(expression: "master:content/lang.json") {
	// 			... on Blob{
	// 			  oid
	// 			}
	// 		  }
	// 		}
	//   }
	return fetch(
		`https://api.github.com/repos/remtori/my-webiste/contents/content/${lang}${type}/${data.id}.${ext}`,
		{
			method: 'PUT',
			body: JSON.stringify({
				message: `[CMS] Update content`,
				content: Buffer.from(formattedContent, 'utf8').toString('base64'),
				sha: 'AAAAAA'
			})
		}
	).then(r => {
		if (!r.ok) throw r;
	});
}
