import { TouchableOpacity, Text, StyleSheet } from 'react-native'

function CustomButton({text, onPress}) {
    return ( 
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
     );
}

const styles = StyleSheet.create({
    button : {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'lightblue',
        width : '80%',
        height : 50,
        borderRadius : 10
    }
})

export default CustomButton;