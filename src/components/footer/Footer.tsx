'use client';

import styles from "./Footer.module.css";
import Link from 'next/link';

interface FooterLink {
    label: string;
    href: string;
}

interface SocialLink {
    platform: string;
    href: string;
    icon: string;
}

const Footer = () => {
    // Navigation links - you can customize these
    const productLinks: FooterLink[] = [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' }
    ];

    const companyLinks: FooterLink[] = [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' }
    ];

    const supportLinks: FooterLink[] = [
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status' },
        { label: 'Changelog', href: '/changelog' }
    ];

    const legalLinks: FooterLink[] = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' }
    ];

    const socialLinks: SocialLink[] = [
        { platform: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
        { platform: 'GitHub', href: 'https://github.com', icon: '⚡' },
        { platform: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
        { platform: 'Discord', href: 'https://discord.com', icon: '💬' }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Product Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Product</h3>
                    <ul className={styles.linkList}>
                        {productLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className={styles.link}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Company</h3>
                    <ul className={styles.linkList}>
                        {companyLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className={styles.link}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Support</h3>
                    <ul className={styles.linkList}>
                        {supportLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className={styles.link}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Social Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Connect</h3>
                    <p style={{ fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                        Follow us on social media for updates and news.
                    </p>
                    <div className={styles.socialLinks}>
                        {socialLinks.map((social, index) => (
                            <Link
                                key={index}
                                href={social.href}
                                className={styles.socialLink}
                                title={social.platform}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Brand Section */}
                <div className={styles.brandSection}>
                    <div className={styles.brand}>
                        <div className={styles.brandIcon}>
                            L
                        </div>
                        <span className={styles.brandName}>Your Brand</span>
                    </div>
                    <p className={styles.brandDescription}>
                        Building amazing experiences with modern technology.
                        We create innovative solutions that help businesses grow and thrive in the digital world.
                    </p>
                </div>

                {/* Bottom Section */}
                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} Your Brand. All rights reserved.
                    </div>
                    <ul className={styles.bottomLinks}>
                        {legalLinks.map((link, index) => (
                            <li key={index}>
                                <Link href={link.href} className={styles.bottomLink}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
