import React, { createContext, useState } from 'react';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
    const [points, setPoints] = useState(0);

    return (
        <PointsContext.Provider value={{ points, setPoints }}>
            {children}
        </PointsContext.Provider>
    );
};