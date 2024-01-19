import { TextInput, StyleSheet } from 'react-native'

function CustomInput({text, onChangeText, value, secureTextEntry, autoCapitalize}) {
    return (  
        <TextInput 
        style={styles.input}
        placeholder={text}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry ?? false}
        autoCapitalize={autoCapitalize ?? 'none'}
        />
    );
}

const styles = StyleSheet.create({
    input : {
        textAlign : 'center',
        width : '80%',
        height : 50,
        borderColor : 'black',
        borderWidth : 1,
        borderRadius : 10
    }
})
export default CustomInput;