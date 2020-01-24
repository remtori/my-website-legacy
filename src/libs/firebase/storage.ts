import { app } from './app';
import { getStorageURLFromPath } from './utils';
import 'firebase/storage';

export const storage = app.storage();

export interface IUploadFileData
{
	data: Blob | string;
	metadata?: firebase.storage.UploadMetadata;
}

export function uploadFile(
	filePath: string,
	{ data, metadata }: IUploadFileData,
	onProgress?: (percent: number) => any,
)
{
	const $data = typeof data === 'string'
		? new Blob([data], { type: 'text/plain' })
		: data;

	return new Promise((resolve, reject) =>
	{
		const uploadTask = storage.ref(filePath).put($data, metadata);
		uploadTask.on(
			'state_changed',
			(snapshot: firebase.storage.UploadTaskSnapshot) => onProgress && onProgress(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
			),
			(err: Error) => reject(err),
			() => resolve(getStorageURLFromPath(filePath)),
		);
	});
}
