import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';

type Props = {};
export default class ModalUser extends Component<Props> {

  state = {
    modalVisible: false,
    name: "",
    firstname: "",
    age: "",
    email: "",
    password: "",

  };

  setModalVisible(visible) {

    this.setState({ modalVisible: visible });
  }

  
  

  componentWillMount() {

    // // const userId = async() =>{
    //   var userId = async() =>{
    //   try{
    //     userId = await AsyncStorage.getItem('token', cookies.token); 
    //   }catch (error){
    //     console.log('nokUserId');
    //   }
    //   console.log(UserId);
    //   return userId;
      
    // }
    _retrieveData = async () => {
      try {
        const userId = await AsyncStorage.getItem('token');
        if (userId !== null) {
          // We have data!!
          console.log(userId);
          return userId;
        }
      } catch (error) {
        console.log('nokUserId');
      }
    };



    fetch('http://cinebamo.it-students.fr/users/' + userId,{
      // fetch('http://192.168.33.15:3000/users/')
      method: 'GET',
      credentials: 'same-origin',
    }).then(function (result) { console.log( 'result' + result); return result.json({}) })
      .then(function (datas) {  
        console.log(datas);
    this.setState({
        name: datas.name,
        firstname: datas.firstname,
        age: datas.age,
        email: datas.email,
        password: datas.password
      }) 
      }.bind(this)); 
      console.log(datas.name);
   
  }
  
  _onUpdate() {

    fetch('http://cinebamo.it-students.fr/users', {
      // fetch('http://http://192.168.33.15:3000/users', {
      method: 'PUT',
      credentials: 'same-origin',
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
        // if (datas !== '') {
        //   this.props.setParentState({ isLogged: true });
        //   console.log(this.state)
        //   _storeData = async () => {
        //     try {
        //       await AsyncStorage.setItem('TOKEN', response._id);
        //     } catch (error) {
        //       // Nok token
        //     }
        //   };
        // } else {

        //   alert(datas);
        // }
      })

  }

  _onDelete() {

    fetch('http://cinebamo.it-students.fr/users', {
      // fetch('http://http://192.168.33.15:3000/users', {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id
      }),
    }).then((response) => response.text())
      .then((datas) => {
        console.log('compte supprimer');
      })
  }


  _onLogout() {
    this.props.setParentState({ isLogged: false });
  }

  render() {
    return (

      <View style={{ marginTop: 22, marginLeft: 250 }}>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={{ marginTop: 22 }}>
            <View style={styles.modalUser} data={this.state.users}>
              <Text>Mon compte</Text>
              <TouchableOpacity>
                <Text style={{ marginTop: 10, color: '#33B8FF' }}
                  onPress={this._onLogout.bind(this)}>
                  Me déconnecter</Text>
              </TouchableOpacity>

                  <View style={styles.container}>

                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.input}
                        value={this.state.name}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ name: text }) }} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.input}
                        // value={this.state.firstname}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ firstname: text }) }} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.input}
                        // value={this.state.age}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ age: text }) }} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.input}
                        // value={this.state.email}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ email: text }) }} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TextInput style={styles.input}
                        // value={this.state.password}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ password: text }) }} />
                    </View>

                    <View style={{ margin: 5, flexDirection: 'row' }}>
                      <TouchableOpacity onPress={this._onUpdate.bind(this)} style={styles.button}>
                        <Text>Modifier mon compte</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={this._onDelete.bind(this)} style={styles.buttonRed}>
                        <Text>Supprimer mon compte</Text>
                      </TouchableOpacity>
                    </View>

                  </View >
                
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{ fontSize: 30 }}>&#10006;</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{ fontSize: 30 }}>&#128100;</Text>
        </TouchableOpacity>

      </View>

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