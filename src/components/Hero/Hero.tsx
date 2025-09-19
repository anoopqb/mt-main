'use client';

import { useEffect, useState } from 'react';
import styles from "./Hero.module.css";

interface CTAButton {
    label: string;
    href?: string;
    url?: string; // Support both href and url from CMS
    target?: '_blank' | '_self' | '_parent';
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
}

interface CMSImage {
    id: number;
    url: string;
    alternativeText?: string;
    formats?: {
        large?: { url: string };
        medium?: { url: string };
        small?: { url: string };
    };
}

interface HeroProps {
    // Support both direct props and CMS data structure
    title?: string;
    description?: string;
    backgroundImage?: string;
    ctaButtons?: CTAButton[];
    showParticles?: boolean;

    // CMS data structure
    image?: CMSImage[];
    cta?: CTAButton[];
    __component?: string;
    id?: number;
}

const Hero = ({
    title = "Welcome to the Future",
    description = "Experience innovation like never before. Our cutting-edge solutions empower you to achieve more, create better, and build the future you envision.",
    backgroundImage,
    ctaButtons,
    showParticles = true,
    // CMS props
    image,
    cta,
}: HeroProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(isLoaded);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Process CMS data
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

    // Use CMS image if available, otherwise fallback to backgroundImage prop or default
    const heroBackgroundImage =
        image?.[0]
            ? `${apiUrl}${image[0].formats?.large?.url || image[0].url}`
            : backgroundImage || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

    // Use CMS CTAs if available, otherwise fallback to ctaButtons prop or default
    const heroCtaButtons =
        cta && cta.length > 0
            ? cta.map(button => ({
                label: button.label,
                href: button.url || button.href,
                target: button.target,
                variant: (button.variant || 'primary') as 'primary' | 'secondary'
            }))
            : ctaButtons || [
                { label: "Get Started", href: "/signup", variant: "primary" as const },
                { label: "Learn More", href: "/about", variant: "secondary" as const }
            ];

    const handleCTAClick = (button: CTAButton) => {
        if (button.onClick) {
            button.onClick();
        } else if (button.href || button.url) {
            const url = button.href || button.url;
            if (button.target === '_blank') {
                window.open(url, '_blank');
            } else {
                window.location.href = url!;
            }
        }
    };

    return (
        <section
            className={styles.hero}
            style={{
                backgroundImage: `url(${heroBackgroundImage})`,
            }}
        >
            {/* Background Overlay */}
            <div className={styles.heroOverlay} />

            {/* Floating Particles */}
            {showParticles && (
                <div className={styles.heroParticles}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={styles.particle} />
                    ))}
                </div>
            )}

            {/* Hero Content */}
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    {title}
                </h1>

                <p className={styles.heroDescription}>
                    {description}
                </p>

                {/* Call to Action Buttons */}
                <div className={styles.heroActions}>
                    {heroCtaButtons.map((button, index) => (
                        <button
                            key={index}
                            className={`${styles.ctaButton} ${button.variant === 'primary' ? styles.ctaPrimary : styles.ctaSecondary
                                }`}
                            onClick={() => handleCTAClick(button)}
                            type="button"
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
