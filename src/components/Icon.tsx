import { h } from 'preact';
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons/faAddressCard";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faTasks } from "@fortawesome/free-solid-svg-icons/faTasks";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons/faCommentAlt";

library.add(
    faUser, faClock, faTags,
    faGithub,
    faHome, faTasks, faAddressCard,
    faCommentAlt,
);

const Icon = ({ icon: iconName, class: className }: {[key: string]: string | any}) => {

    const { abstract: [ ele ] } = icon(
        iconName,
        { classes: className },
    );

    return h(
        ele.tag,
        { ...ele.attributes },
        ele.children && ele.children.map(c => h(
            c.tag,
            { ...c.attributes },
        )),
    );
};

export default Icon;
