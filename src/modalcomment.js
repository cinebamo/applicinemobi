import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import ModalUser from './modaluser.js';
type Props = {};
export default class ModalComment extends Component<Props> {
constructor(props) {
  super(props);
  this.state = { text: 'Your comment'};
}
   state = {
    modalVisible: true,
    comment: "",
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _escapemodal(){
    this.props.setParentState({showCommentModal:false})
  }
  _onPublish() {
    console.log('onPublish')
// recuperer le commentaire tapé par le pelo 
// le comm est dans la variable this.state.comment
var comment = {
    content: this.state.comment,
    date: this.state.date,
  } ;
// Envoyer au serveur 
fetch('http://cinebamo.it-students.fr/comments', {
    // fetch('http://192.168.33.15:3000/users', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
    .then((response) => response.text())
    .then((datas) => {
      console.log(datas);
         // Fermer ma modale 
         this.props.setParentState({showCommentModal:false})
        // demander au Dashboard d'afficher la réponse 
        this.props.addComment(comment)
    })
}
  render() {
    return (
      
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
         
         <View style={styles.container}>
                <View style={styles.modalStyle}>
                    <Image source={require('../asset/logo_cinebamo.png')} style={styles.modalLogoStyle} />
                    <ModalUser setParentState={this.setState.bind(this)} />
                </View>
          
          <View style={{ alignItems:'center', marginTop:100, }}>
                  <TextInput style={styles.textcom}
                    multiline={true}
                    numberOfLines={10}
                    value={this.state.comment}
                    placeholder="Your comment"
                    autoCorrect={false}
                    onChangeText={(text) => { this.setState({ comment: text }) }} />
              <TouchableOpacity>
                <Text style={styles.buttonpublish}
                  onPress={this._onPublish.bind(this)}>
                 Publier</Text>
              </TouchableOpacity>
                </View>
          </View>
              <TouchableOpacity
                onPress={() => {
                  this._escapemodal(!this.state.modalVisible);
                }}>
                <Text style={{ fontSize: 30, textAlign: 'center', marginBottom:20 }}>&#10006;</Text>
              </TouchableOpacity>
        
        </Modal>
        </View>
        
    );
  }
}
const styles = StyleSheet.create({
  
  textcom: {
    height:100,
    width:200,
    borderColor: 'silver',
    borderWidth:1,
    textAlign:'left',
    textAlignVertical: 'top',
 
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalStyle: {
    flexDirection: 'row',
    //Le margin et Padding "Bouscule" les autre view  
    
},
  modalLogoStyle: {
    marginTop: 30,
    height: 50,
    width: 50
  },
  buttonpublish : {
    marginTop: 20, 
    color: '#FFF', 
    backgroundColor:'black', 
    fontSize:40, 
    borderRadius:20, 
    borderColor: 'rgba(191, 57, 57, 0.9)' ,
    borderWidth:10,
    textAlign: 'center'
  },
});