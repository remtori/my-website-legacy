import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF, faGithub
} from '@fortawesome/free-brands-svg-icons';

import styles from './styles.scss';

const currYear = new Date().getFullYear().toString();

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.links}>
                <a href="https://fb.com/xLQVx" rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://github.com/Remtori" rel="noreferrer" target="_blank">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="mailto:lqv.remtori@gmail.com" target="_blank">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </div>
            <div>
                &copy; {currYear} All rights reserved.
            </div>
        </footer>
    );
}