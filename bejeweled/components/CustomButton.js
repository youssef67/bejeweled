import { TouchableOpacity, Text, StyleSheet } from 'react-native'

function CustomButton({text, onPress, disabled = false, colorGreen = false, inContainer = false}) {

    let backgroundColor;
    let width;

    if (!colorGreen) backgroundColor = 'red'
    else backgroundColor = 'green'

    if (inContainer) width = "40%"
    else width = "80%"


    return ( 
        <TouchableOpacity style={[styles.button, {backgroundColor, width}]} onPress={onPress} disabled={disabled}>
            <Text style={{fontFamily : "mario", color: "white"}}>{text}</Text>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button : {
        alignItems : 'center',
        justifyContent : 'center',
        width : '80%',
        height : 50,
        borderRadius : 10
    }
})

export default CustomButton;