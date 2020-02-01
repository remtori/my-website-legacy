import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { NotFound, LoadingDot } from './placeholders';

export type JSXImageProps = {
	src: string,
	hasOptimize?: boolean,
	width?: number | undefined,
	height?: number | undefined
} & h.JSX.HTMLAttributes<HTMLImageElement>;

export default function JSXImage({ src, width, height, hasOptimize = false, ...props }: JSXImageProps) {

	const [isLoading, setIsLoading] = useState(true);
	const [imageSource, setImageSource] = useState(src);

	useEffect(() => {
		setIsLoading(true);

		const img = new Image();
		img.onload = () => {
			setIsLoading(false);
			setImageSource(src);
		};
		img.onerror = () => {
			setIsLoading(false);
			setImageSource('error');
		};
		img.src = src;

		return () => {
			img.onload = null;
			img.onerror = null;
			img.src = '';
		};
	}, [src]);

	if (isLoading) {
		return <LoadingDot width={width} height={height} class={props.class} />;
	} else if (imageSource === 'error') {
		return <NotFound width={width} height={height} class={props.class} />;
	} else {
		return (
			<img
				{...props}
				src={imageSource}
			/>
		);
	}
}
