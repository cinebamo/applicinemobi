/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Linking, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Dashboard from './src/dashboard.js';
import LoginForm from './src/loginform.js';
import AccountForm from './src/accountform.js';


type Props = {};
export default class App extends Component<Props> {

  state = {
    isLogin: true,
    isLogged: false,
  }

  _isLogged(){

  }



  render() {
    return (

      <View style={styles.container}>

        <View style={{ height: 100 }}>
        <Image source={require('./asset/logo_cinebamo.png')} style={{height:100, width:100}}/>
        </View>

        {

          (this.state.isLogged) ? (

            <Dashboard/>

          ) : (

              (this.state.isLogin) ? (

                <LoginForm setParentState={this.setState.bind(this)}/>
                
              ) : (

                  <AccountForm setParentState={this.setState.bind(this)}/>

                )
            )
        }

        <View style={{ marginTop: "auto", paddingBottom: 10 }}>
          <TouchableOpacity onPress={ ()=>{ Linking.openURL('http://cinebamo.it-students.fr/cgu')}} >
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
