'use client';

import styles from "./Footer.module.css";

interface FooterProps {
    propertyName?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    socialLinks?: string;
    officeHours?: Array<{
        id: number;
        day: string;
        time: string;
    }>;
    copyright?: string;
}

const Footer = (props: FooterProps) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Address Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Address</h3>
                    <div className={styles.info}>
                        {props.address ? (
                            <p>{props.address}</p>
                        ) : (
                            <>
                                <p>123 Business Street</p>
                                <p>Suite 100</p>
                                <p>City, State 12345</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Phone Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Contact</h3>
                    <div className={styles.info}>
                        <p>Phone: {props.phone || '(555) 123-4567'}</p>
                        {props.email && <p>Email: {props.email}</p>}
                        {props.website && <p>Website: {props.website}</p>}
                    </div>
                </div>

                {/* Office Hours Section */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Office Hours</h3>
                    <div className={styles.info}>
                        {props.officeHours && props.officeHours.length > 0 ? (
                            props.officeHours.map((hours) => (
                                <p key={hours.id}>{hours.day}: {hours.time}</p>
                            ))
                        ) : (
                            <>
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 4:00 PM</p>
                                <p>Sunday: Closed</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Copyright Section */}
                <div className={styles.copyright}>
                    {props.copyright || `© ${new Date().getFullYear()} ${props.propertyName || 'Your Company Name'}. All rights reserved.`}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
