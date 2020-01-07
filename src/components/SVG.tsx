import { h } from 'preact';

export default function SVG(props: h.JSX.HTMLAttributes<HTMLImageElement>)
{
	return <img {...props} />;
}

// export default function SVG({ src = '', ...props }: h.JSX.HTMLAttributes<HTMLElement>)
// {
// 	return (
// 		<i
// 			{...props}
// 			dangerouslySetInnerHTML={{ __html: src }}
// 		/>
// 	);
// }
