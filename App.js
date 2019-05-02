/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { Linking, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Dashboard from './src/dashboard.js';
import Comments from './src/comments.js';
import LoginForm from './src/loginform.js';
import AccountForm from './src/accountform.js';



type Props = {};
export default class App extends Component<Props> {

  state = {
    isLogin: true,
    isLogged: false,
  }

  render() {
    return (

      <View style={styles.container}>

        {

          (this.state.isLogged) ? (

            <Dashboard setParentState={this.setState.bind(this)}/>

          ) : (

              (this.state.isLogin) ? (
                <View>

                  <View style={{ height: 100, flexDirection: 'row', margin: 20, padding: 20 }}>
                    <Image source={require('./asset/logo_cinebamo.png')} style={{ height: 100, width: 100 }} />
                  </View>

                  <LoginForm setParentState={this.setState.bind(this)} />

                </View>
              ) : (

                  <View>

                    <View style={{ height: 100, flexDirection: 'row', margin: 20, padding: 20 }}>
                      <Image source={require('./asset/logo_cinebamo.png')} style={{ height: 100, width: 100 }} />
                    </View>

                    <AccountForm setParentState={this.setState.bind(this)} />

                  </View>
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

});