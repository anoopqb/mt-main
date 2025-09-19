'use client';

import { useState, useEffect } from 'react';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    animationDelay?: number;
}

interface GlobalData {
    data: {
        id: number;
        documentId: string;
        specialsText: string;
    };
}

const Eyebrow: React.FC<EyebrowProps> = ({
    text,
    backgroundColor,
    textColor,
    animationDelay = 1000
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [specialsText, setSpecialsText] = useState<string>(text || "Special Announcement: Limited Time Offer Available!");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch specials text from API
        const fetchSpecialsText = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
                const response = await fetch(`${apiUrl}/global?fields=specialsText`);

                if (response.ok) {
                    const data: GlobalData = await response.json();
                    if (data.data?.specialsText) {
                        setSpecialsText(data.data.specialsText);
                    }
                } else {
                    console.warn('Failed to fetch specials text:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching specials text:', error);
                // Keep default text if fetch fails
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpecialsText();
    }, []);

    useEffect(() => {
        // Show the eyebrow after the specified delay and after data is loaded
        if (!isLoading) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, animationDelay);

            return () => clearTimeout(timer);
        }
    }, [animationDelay, isLoading]);

    return (
        <div
            className={`${styles.eyebrow} ${isVisible ? styles.visible : ''}`}
            style={{
                backgroundColor: backgroundColor || undefined,
                color: textColor || undefined,
            }}
        >
            <div className={styles.content}>
                <span className={styles.text}>
                    {isLoading ? "Loading..." : specialsText}
                </span>
            </div>
        </div>
    );
};

export default Eyebrow;
