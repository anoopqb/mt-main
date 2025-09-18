'use client';

import { useState } from 'react';
import styles from "./Header.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface NavItem {
    label: string;
    href: string;
    active?: boolean;
}

interface CmsNavItem {
    id: number;
    label: string;
    url: string;
    target: string;
}



const Header = ({ logo, navItems: cmsNavItems }: {
    logo: string;
    navItems: CmsNavItem[];
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    // Transform CMS nav items to component nav items
    const navItems: NavItem[] = cmsNavItems.map(item => ({
        label: item.label,
        href: item.url,
        active: pathname === item.url,
        target: item.target
    }));

    return (
        <>
            <header className={styles.header}>
                {/* Logo Section */}
                <div className={styles.logoContainer}>
                    <Link href="/" className={styles.logo}>
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${logo}`} alt="Logo" width={100} height={50} />
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