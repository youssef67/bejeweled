import React, {useState} from "react";
import SquaresContext from "./GameContext";


const GameProvider = ({children}) => {
    const [gameGrid , setgameGrid] = useState({
        
    })

    return (
        <SquaresContext.Provider value={{gameGrid, setgameGrid}}>
            {children}
        </SquaresContext.Provider>
    )

}

export default GameProvider