import { h } from 'preact';
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faTags } from "@fortawesome/free-solid-svg-icons/faTags";

library.add(
    faUser, faClock, faTags,
);

const Icon = ({ icon: iconName, class: className }: {[key: string]: string | any}) => {

    const { abstract } = icon(
        { prefix: 'fas', iconName},
        { classes: className },
    );

    const ele = abstract[0];

    return h(ele.tag, { ...ele.attributes });
};

export default Icon;
