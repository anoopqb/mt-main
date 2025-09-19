import React from 'react';
import Hero from './Hero/Hero';

interface DynamicZoneComponent {
    id: number;
    __component: string;
    [key: string]: any;
}

interface Props {
    dynamicZone: DynamicZoneComponent[];
}


const componentMapping: { [key: string]: React.ComponentType<any> } = {
    'dynamic-zone.hero': Hero,
}


const DynamicZoneManager: React.FC<Props> = ({ dynamicZone }) => {
    return (
        <>
            {dynamicZone.map((componentData, index) => {
                const Component = componentMapping[componentData.__component];
                if (!Component) {
                    console.warn(`No component found for: ${componentData.__component}`);
                    return null;
                }
                return <Component key={index} {...componentData} />;
            })}
        </>
    );
};

export default DynamicZoneManager;