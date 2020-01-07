import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import isMobile from '~/utils/isMobile';
import willHasWebp from '~/utils/hasWebp';
import { LoadingCircle, NotFound } from './placeholder';

function parseImageSource(source: string, shouldParse: boolean): Promise<string>
{
	if (!shouldParse || source.startsWith('http')) return Promise.resolve(source);

	return willHasWebp.then(
		hasWebp => `${source}${isMobile ? '.mobile' : ''}${hasWebp ? '.webp' : '.jpg'}`,
	);
}

export type JSXImageProps = { src: string, hasOptimize?: boolean } & h.JSX.HTMLAttributes<HTMLImageElement>;

export default function JSXImage({ src, hasOptimize = false, ...props }: JSXImageProps)
{
	const [ isLoading, setIsLoading ] = useState(true);
	const [ imageSource, setImageSource ] = useState(src);

	useEffect(() =>
	{
		setIsLoading(true);
		parseImageSource(src, hasOptimize).then(source =>
		{
			const img = new Image();
			img.onload = () =>
			{
				setIsLoading(false);
				setImageSource(source);
			};
			img.onerror = () =>
			{
				setIsLoading(false);
				setImageSource('error');
			};
			img.src = source;
		});

	}, [ src ]);

	if (isLoading)
	{
		return <LoadingCircle />;
	}
	else if (imageSource === 'error')
	{
		return <NotFound width={64} height={32} />;
	}
	else
	{
		return (
			<img
				{...props}
				src={imageSource}
			/>
		);
	}
}
