'use client';

import { useEffect, useState } from 'react';
import styles from "./Hero.module.css";

interface CTAButton {
    label: string;
    href?: string;
    onClick?: () => void;
    variant: 'primary' | 'secondary';
}

interface HeroProps {
    title?: string;
    description?: string;
    backgroundImage?: string;
    ctaButtons?: CTAButton[];
    showParticles?: boolean;
}

const Hero = ({
    title = "Welcome to the Future",
    description = "Experience innovation like never before. Our cutting-edge solutions empower you to achieve more, create better, and build the future you envision.",
    backgroundImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    ctaButtons = [
        { label: "Get Started", href: "/signup", variant: "primary" as const },
        { label: "Learn More", href: "/about", variant: "secondary" as const }
    ],
    showParticles = true
}: HeroProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleCTAClick = (button: CTAButton) => {
        if (button.onClick) {
            button.onClick();
        } else if (button.href) {
            window.location.href = button.href;
        }
    };

    return (
        <section
            className={styles.hero}
            style={{
                backgroundImage: `url(${backgroundImage})`,
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
                    {ctaButtons.map((button, index) => (
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
