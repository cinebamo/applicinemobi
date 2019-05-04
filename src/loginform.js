import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

type Props = {};
export default class LoginForm extends Component<Props> {

    state = {
        identificationLogin: "",
        identificationPassword: "",
    }

    _onLogin() {
        console.log('onLogin')
        //recuperer values input
        console.log('Coucou : ' , this.state);
        //console.log('Response :' , state);
        // envoyer
        fetch('http://cinebamo.it-students.fr/login', {
            // fetch('http://192.168.33.15:3000/login', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.identificationLogin,
                password: this.state.identificationPassword
            }),
        })
            .then((response) => {
                try {

                    var cookies = {};
                    var cooks = response.headers.map['set-cookie'].split(';');
                    for (var i in cooks) {
                        var [name, value] = cooks[i].trim().split('=');
                        console.log(name, value);
                        cookies[name] = value;
                    }
                    console.log('cookies.token ' + cookies.token);
                    AsyncStorage.setItem('token', cookies.token.toString());
                    console.log(response);
                } catch(e) {console.log(e)}
                return response.json();
            })
            .then((datas) => {
                console.log(datas)
                if (datas.message == 'connection reussie') {
                    console.log('Datas ok: ',datas.message);
                    this.props.setParentState({ isLogged: true });
                    console.log(this.state);
                } else {
                    console.log('Datas Nok: ' , datas.result);
                    this.setState({ identificationLogin: '' });
                    this.setState({ identificationPassword: '' });
                    alert('Veuillez vérifier votre saisie');
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="login"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ identificationLogin: text }) }} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ identificationPassword: text }) }} />
                </View>

                <View style={{ margin: 5 }}>
                    <TouchableOpacity onPress={this._onLogin.bind(this)} style={styles.button}>
                        <Text>Se connecter</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 5 }}>
                    <TouchableOpacity onPress={() => { this.props.setParentState({ isLogin: false }) }} style={styles.button}>
                        <Text>Créer un compte</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'silver',
        borderWidth: 1,
        flex: 1,
        margin: 10,
        padding: 5,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
    },
});