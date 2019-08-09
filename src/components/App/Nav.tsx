import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    InputGroup,
    InputGroupAddon,
    Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.scss';
import icon from '../../assets/images/icons/icon-192.png';

interface CNavItemProps extends React.HTMLAttributes<HTMLElement> {
    to: string;
    exact?: boolean;
};

function CNavItem(props: CNavItemProps) {
    return (
        <NavItem>
            <NavLink
                tag={RRNavLink}
                activeClassName={styles.active}
                {...props}
            />
        </NavItem>
    );
}

export default function MainNav() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        function onClick() {
            if (isOpen) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', onClick);
        return () => {
            document.removeEventListener('click', onClick);
        }
    });

    function onSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
    }

    return (
        <Navbar className={styles.nav} color="dark" dark fixed="top" expand="md">
            <NavbarBrand tag={RRNavLink} to="/">
                <img src={icon} height="32" />
                <span className="align-middle d-none d-md-inline"> Remtori's Comfy Home~</span>
            </NavbarBrand>            
            <InputGroup className={styles.search} onSubmit={onSearch}>
                <Input placeholder="Search..." onChange={onSearchChange} />
                <InputGroupAddon addonType="append">
                    <Button color="secondary">
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </InputGroupAddon>
            </InputGroup>
            <NavbarToggler onClick={toggle} />
            <Collapse className="bg-dark" isOpen={isOpen} navbar>
                <Nav navbar>
                    <CNavItem to="/blogs/view?id=about" exact>About</CNavItem>
                    <CNavItem to="/blogs" exact>Blogs</CNavItem>
                    <CNavItem to="/projects" exact>Projects</CNavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem><NavLink>Sign In</NavLink></NavItem>
                </Nav>                
            </Collapse>
        </Navbar>
    );
}
