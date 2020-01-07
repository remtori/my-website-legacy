import { h } from 'preact';
import { library, icon, IconName, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import SVG from './SVG';

library.add(
	faUser, faClock, faTags,
	faHome, faTasks, faAddressCard,
	faCommentAlt,
	faGithub, faTwitter,
);

export const icons = {
	faUser, faClock, faTags,
	faHome, faTasks, faAddressCard,
	faCommentAlt,
	faGithub, faTwitter,
};

export interface IconProps
{
	icon: IconName | IconLookup | string;
	class?: string;
	[key: string]: any;
}

// tslint:disable-next-line: variable-name
export default function Icon({ icon: iconName, class: className, ...props }: IconProps)
{
	if (typeof iconName === 'string')
	{
		return (
			<SVG
				style={p16}
				src={iconName}
				class={className}
				{...props}
			/>
		);
	}

	const { abstract: [ ele ] } = icon(
		iconName,
		{ classes: className },
	);

	return h(
		ele.tag,
		{ ...ele.attributes, ...props },
		ele.children && ele.children.map(c => h(
			c.tag,
			{ ...c.attributes },
		)),
	);
}

const p16 = { width: 18, height: 18 };
