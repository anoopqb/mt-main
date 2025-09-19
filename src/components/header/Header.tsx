'use client';

import styles from "./Header.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Eyebrow from '../Eyebrow/Eyebrow';

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



const Header = ({ logo, navItems: cmsNavItems, eyebrowText }: {
    logo: string;
    navItems: CmsNavItem[];
    eyebrowText?: string;
}) => {
    const pathname = usePathname();


    // Transform CMS nav items to component nav items
    const navItems: NavItem[] = cmsNavItems.map(item => ({
        label: item.label,
        href: item.url,
        active: pathname === item.url,
        target: item.target
    }));

    return (
        <>
            <div className={styles.headerContainer}>
                <Eyebrow />
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
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </header>
            </div>
        </>
    );
};

export default Header;