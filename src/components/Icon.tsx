import { h } from 'preact';
import { library, icon, IconName, IconLookup } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faTags } from '@fortawesome/free-solid-svg-icons/faTags';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faTasks } from '@fortawesome/free-solid-svg-icons/faTasks';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

export const icons = {
	faUser, faClock, faTags, faEdit,
	faHome, faTasks, faAddressCard,
	faCommentAlt,
	faEnvelope,
	faGithub, faTwitter
};

library.add(...Object.values(icons));

export interface IconProps {
	icon: IconName | IconLookup | string;
	class?: string;
	[key: string]: any;
}

// tslint:disable-next-line: variable-name
export default function Icon({ icon: iconName, class: className, ...props }: IconProps) {
	if (props.title !== undefined) props.alt = props.title;

	if (typeof iconName === 'string') {
		return (
			<img
				style={p16}
				src={iconName}
				class={className}
				{...props}
			/>
		);
	}

	const { abstract: [ele] } = icon(
		iconName,
		{ classes: className }
	);

	return h(
		ele.tag,
		{ ...ele.attributes, ...props },
		ele.children && ele.children.map(c => h(
			c.tag,
			{ ...c.attributes }
		))
	);
}

const p16 = { width: 18, height: 18 };
