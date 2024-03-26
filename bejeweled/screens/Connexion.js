import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { StyleSheet, View, Alert, Text, TouchableOpacity,Image } from "react-native";
import { useState, useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Connexion({ navigation }) {
    

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setCurrentUser } = useContext(CurrentUserContext)

    const handleConnexion = () => {
        if (email === '' || password === '') {
            Alert.alert('Veuillez remplir tous les champs')
            return
        }
        fetch('http://209.38.204.73/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
        .then(data => {
            if (!data.success) { return Alert.alert(data.message) }
            setCurrentUser({ id: data.id, highscore: data.highscore, name : data.name, surname : data.surname, score : 0});
            setEmail('')
            setPassword('')
            navigation.navigate('WaitingScreen')
        })
    }

    return (

        <View style={styles.center}>
            <Image source= {require("../assets/policeMarioImage/connexion.png")} />
            <View style={{ display: "flex", width: '100%', alignItems: "center", gap: 3 }}>
                <CustomInput text="Email" onChangeText={text => setEmail(text)} value={email} />
                <CustomInput text="Mot de Passe" onChangeText={text => setPassword(text)} value={password} secureTextEntry />
            </View>
            <CustomButton text="Connexion" onPress={handleConnexion} />
            <TouchableOpacity onPress={() => navigation.navigate('Inscription')} ><Text style={{fontFamily : "mario", color: "#39b449"}}>Inscription</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    },
})

export default Connexion;
