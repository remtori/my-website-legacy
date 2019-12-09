import { h } from 'preact';
import ImageV from '../../imageV';
import Icon from '../../icon';
import { timeToString } from '../../../utils';

export default function BlogListItem({ blog }) {
	const { key, previewImg: { url, width, height}, title, description, timeAdded, author, tags } = blog;	
	return (
		<div class={ style.listItem } data-key={key} >
			<a class={ style.imgWrapper } href={ `/blog?id=${key}` }>
				<ImageV src={url} width={width} height={height}/>
			</a>
			<a class={ style.titleWrapper } href={ `/blog?id=${key}` }>
				<div>{ title }</div>
			</a>			
			<div class={ style.description }>
				<div>{ description }</div>
			</div>
			<div class={ style.author }>
				<Icon class={ style.icon } icon="user" />
				{ author }
			</div> 
			<div class={ style.timestamp }>
				<Icon class={ style.icon } icon="clock" />
				{ timeToString(timeAdded) }
			</div>
			<div class={ style.tags }>
				<Icon class={ style.icon } icon="tags" />
				{  
					tags.split(/\s/g).filter(tag=>tag.length > 0).map(tag => 
						( <a href={ `/bloglist?tag=${tag}` }>{ tag }</a> )
					)
				}
			</div>
		</div>
	);
};