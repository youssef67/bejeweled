import React, {useState} from "react";
import SquaresContext from "./SquaresContext";


const SquaresProvider = ({children}) => {
    const [movesImage, setmovesImage] = useState({
        firstTypeAnimal : null,
        secondTypeAnimal : null,
        firstIdSquare : null,
        secondeIdSquare : null,
        firstClick : false,
        secondClick : false
    })

    return (
        <SquaresContext.Provider value={{movesImage, setmovesImage}}>
            {children}
        </SquaresContext.Provider>
    )

}

export default SquaresProvider