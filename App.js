/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { AsyncStorage, Linking, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import Dashboard from './src/dashboard.js';
import LoginForm from './src/loginform.js';
import AccountForm from './src/accountform.js';
import ModalUser from './src/modaluser.js'

type Props = {};
export default class App extends Component<Props> {

  state = {
    isLogin: true,
    isLogged: false,

    modalVisible: false,
    name: "",
    firstname: "",
    age: "",
    email: "",
    password: "",
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _isLogged() {
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem(TOKEN);
        if (value !== null) {
          // We have token!!
          console.log('We have token!!' + value);
        }
      } catch (error) {
        console.log('nok token');
      }
    };
  }

  render() {
    return (

      <View style={styles.container}>

        <View style={{ height: 100, flexDirection: 'row', margin: 20, padding: 20 }}>
          <Image source={require('./asset/logo_cinebamo.png')} style={{ marginTop: 15, height: 50, width: 50 }} />

          {(this.state.isLogged) ? (

            <ModalUser setParentState={this.setState.bind(this)} />
            ) : (
              <ModalUser style={{display:'none'}} />//a construire
            )
          }
        </View>
        {

          (this.state.isLogged) ? (

            <Dashboard />

          ) : (

              (this.state.isLogin) ? (

                <LoginForm setParentState={this.setState.bind(this)} />

              ) : (

                  <AccountForm setParentState={this.setState.bind(this)} />

                )
            )
        }

        <View style={{ marginTop: "auto", paddingBottom: 10 }}>
          <TouchableOpacity onPress={() => { Linking.openURL('http://cinebamo.it-students.fr/cgu') }} >
            <Text>CGU</Text>
          </TouchableOpacity>
        </View>

      </View >
    );
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
    margin: 5,
    borderRadius: 5,
  },
  modalUser: {
    borderColor: 'silver',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 20,
    padding: 20,
  },
  buttonRed: {
    backgroundColor: '#DC143C',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },

});