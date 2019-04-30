import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import SearchView from './searchView';
import ModalUser from './modaluser.js';

type Props = {};
export default class Comments extends Component<Props> {

    state = {
        comments: []
    }
    componentWillMount() {

         fetch('http://cinebamo.it-students.fr/comments', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
               'content-Type': 'application/json',
             },
         })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
               comments: responseJson
            })
          }).catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
          console.log('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
           throw error;
           });
    }

    render() {
        return (

            <View style={styles.container}>
            <View style={styles.modalStyle}>
                                <Image source={require('../asset/logo_cinebamo.png')} style={ styles.modalLogoStyle } />
                                <ModalUser setParentState={this.setState.bind(this)} />

                            </View>
                            <View>
                                <SearchView setParentState={this.setState.bind(this)}/>
                            </View>
                <View style={styles.form}>
                    <Text>Liste des commentaires</Text>
                    <FlatList
                        data={this.state.comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <View>
                                    <Text>{item.title}</Text>
                                </View>
                                <View>
                                    <Text>{item.content}</Text>
                                </View>
                            </View>
                        )}>
                    </FlatList>
               </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    modalStyle:{
        height: 100,
        flexDirection: 'row',
      //Le margin et Padding "Bouscule" les autre view
      //  margin: 20,
      //  padding: 20
    },
    modalLogoStyle: {
        marginTop: 15,
        height: 50,
        width: 50
    },
    form: {


        alignItems: 'stretch',
        // alignSelf: 'stretch',
        //backgroundColor: '#ff0000',
        flex: 1,
    },
    container: {
        //flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
         backgroundColor: '#fff',
      }
});