import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { StyleSheet, View, Alert, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

function Inscription({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')

    const isEmailValid = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
      };

    const handleInscription = () => {
        if (email === '' || password === '' || password2 === '' || nom === '' || prenom === '') {
            Alert.alert('Veuillez remplir tous les champs')
            return
        }
        if (password !== password2) {
            Alert.alert('Les mots de passe ne correspondent pas')
            return
        }
        if (!isEmailValid(email)) {
            Alert.alert('Email invalide')
            return
        }
        fetch('http://209.38.204.73/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nom,
                surname: prenom,
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(!data.success) {return Alert.alert(data.message)}
                Alert.alert('Inscription réussie')
                setEmail('');
                setPassword('');
                setPassword2('');
                setNom('');
                setPrenom('');      
            })
    }

    return (

        <View style={styles.center}>
            <Text>Inscription</Text>
            <View style={{ display: "flex", width: '100%', alignItems: "center", gap: 3 }}>
                <CustomInput text="Email" onChangeText={text => setEmail(text)} value={email} />
                <CustomInput text="Nom" onChangeText={text => setNom(text)} value={nom} autoCapitalize='sentences'/>          
                <CustomInput text="Prenom" onChangeText={text => setPrenom(text)} value={prenom} autoCapitalize='sentences' />
                <CustomInput text="Mot de Passe" onChangeText={text => setPassword(text)} value={password} secureTextEntry />
                <CustomInput text="Confirmez le mot de passe" onChangeText={text => setPassword2(text)} value={password2} secureTextEntry />
            </View>
            <CustomButton text="S'inscrire" onPress={handleInscription} />
            <TouchableOpacity onPress={() => navigation.navigate('Connexion')} ><Text>Connexion</Text></TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    }
})

export default Inscription;