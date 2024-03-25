import { TouchableOpacity, Text, StyleSheet } from 'react-native'

function CustomButton({text, onPress, disabled=false}) {
    return ( 
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled}>
            <Text style={{fontFamily : "mario", color: "white"}}>{text}</Text>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button : {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'red',
        width : '80%',
        height : 50,
        borderRadius : 10
    }
})

export default CustomButton;