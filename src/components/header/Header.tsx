'use client';

import { useState } from 'react';
import styles from "./Header.module.css";
import Link from 'next/link';

interface NavItem {
    label: string;
    href: string;
    active?: boolean;
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Navigation items - you can customize these
    const navItems: NavItem[] = [
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about', active: false }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={styles.header}>
                {/* Logo Section */}
                <div className={styles.logoContainer}>
                    <div className={styles.logoIcon}>
                        L
                    </div>
                    <Link href="/" className={styles.logo}>
                        Logo
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navItems.map((item, index) => (
                            <li key={index} className={styles.navItem}>
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${item.active ? styles.active : ''}`}
                                    onClick={handleNavClick}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Hamburger Menu Button */}
                <button
                    className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                    <span className={styles.hamburgerLine}></span>
                </button>
            </header>

            {/* Mobile Navigation */}
            <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
                <ul className={styles.mobileNavList}>
                    {navItems.map((item, index) => (
                        <li key={index} className={styles.mobileNavItem}>
                            <Link
                                href={item.href}
                                className={`${styles.mobileNavLink} ${item.active ? styles.active : ''}`}
                                onClick={handleNavClick}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default Header;