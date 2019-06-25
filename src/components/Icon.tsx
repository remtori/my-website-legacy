import { h } from 'preact';
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

library.add(
    faUser, faClock, faTags,
    faGithub,
);

const Icon = ({ icon: iconName, class: className }: {[key: string]: string | any}) => {

    const { abstract } = icon(
        iconName,
        { classes: className },
    );

    const ele = abstract[0];
    const child = ele.children && ele.children[0];

    return h(
        ele.tag,
        { ...ele.attributes },
        child && h(
            child.tag,
            { ...child.attributes },
        ),
    );
};

export default Icon;
