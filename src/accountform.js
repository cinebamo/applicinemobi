import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


type Props = {};
export default class AccountForm extends Component<Props> {

    state = {
        name: "",
        firstname: "",
        age: "",
        email: "",
        password: "",
    }


    _onCreate() {
        console.log('onCreate')
        fetch('http://cinebamo.it-students.fr/users', {
        // fetch('http://192.168.33.15:3000/users', {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.state.name,
            firstname: this.state.firstname,
            age: this.state.age,
            email: this.state.email,
            password: this.state.password
          }),
        })
          .then((response) => response.text())
          .then((datas) => {
            console.log(datas);
            if (datas == 'creation ok') {
                this.props.setParentState({isLogged : true}) ;
                console.log(this.state)
              } else {
                this.setState({identificationPassword:''})
                alert(datas) ;
              }      
          })
    }

    render() {

        return (


            <View style={styles.container}>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="Nom"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {this.setState({ name: text })}}  />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="Prénom"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {this.setState({ firstname: text })}} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="Age"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {this.setState({ age: text })}} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {this.setState({ email: text })}} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={styles.input}
                        placeholder="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => {this.setState({ password: text })}} />
                </View>

                <View style={{ margin: 5 }}>
                    <TouchableOpacity onPress={this._onCreate.bind(this)} style={styles.button}>
                        <Text>Créer mon compte</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ margin: 5 }}>
                    <TouchableOpacity onPress={() => {this.props.setParentState({ isLogin: true })}} style={{ marginTop: "auto", paddingBottom: 10 }}>
                        <Text>J'ai déjà un compte</Text>
                    </TouchableOpacity>
                </View>
            </View >
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