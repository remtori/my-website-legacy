import { h, Component } from 'preact';
import { Link } from 'preact-router';

import style from './index.scss';

class Header extends Component
{
    public render()
    {
        return (
            <header class={style.header}>
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/bloglist">Blog</Link>
                    <Link href="/projects">Projects</Link>
                    <Link href="/blog?id=about">About</Link>
                </nav>
            </header>
        );
    }
}

export default Header;
