import React from 'react';
import { AmbientLight } from 'three';

const CustomAmbientLight = () => {
    return (
        <>
            <ambientLight castShadow 
                color="white"
                intensity={2}
            />
        </>
    );
};

export default CustomAmbientLight;
