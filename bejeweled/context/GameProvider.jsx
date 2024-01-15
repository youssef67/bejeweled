import React, {useState} from "react";
import GameContext from "./GameContext";


const GameProvider = ({children}) => {
    const [gameGrid , setgameGrid] = useState({
        
    })

    return (
        <GameContext.Provider value={{gameGrid, setgameGrid}}>
            {children}
        </GameContext.Provider>
    )

}

export default GameProvider