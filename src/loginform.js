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
        console.log(this.state);
        // envoyer
        fetch('http://cinebamo.it-students.fr/login', {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.identificationLogin,
            password: this.state.identificationPassword
          }),
        })
          .then((response) => response.text())
          .then((datas) => {
            console.log(datas);
            if (datas == 'connection ok') {
                this.props.setParentState({isLogged : true}) ;
                console.log(this.state)
              } else {
                this.setState({identificationPassword:''})
                alert(datas) ;
              }      
          })// si pas ok on affiche un message d erreur + efface input
    
        // si ok donne acces au dashboard
    
      }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="login"
                        autoCapitalize="none"
                        onChangeText={(text) => {this.setState({ identificationLogin: text })}} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="password"
                        autoCapitalize="none"
                        onChangeText={(text) => {this.setState({ identificationPassword: text })}} />
                </View>

                <View style={{ margin: 5 }}>
                    <TouchableOpacity onPress={this._onLogin.bind(this)} style={styles.button}>
                        <Text>Se connecter</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 5 }}>
                    <TouchableOpacity onPress={() => {this.props.setParentState({ isLogin: false }) }} style={styles.button}>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'silver',
        borderWidth: 1,
        flex: 1,
        margin: 10,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
    },
});