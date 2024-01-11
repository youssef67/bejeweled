import React, { createContext, useState } from "react";
// import MoveImageContext from "./MoveImageContext";

const MoveImageContext = createContext()

const AppProvider = ({children}) => {
    const [data, setData] = useState(null);

    return (
        <MoveImageContext.Provider value={{ data, setData }}>
            {children}
        </MoveImageContext.Provider>
    )
}

export  {AppProvider, MoveImageContext}