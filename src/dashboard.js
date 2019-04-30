import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import ModalUser from './modaluser.js';
import SearchView from './searchView';
type Props = {};
export default class Dashboard extends Component<Props> {

    state = {
        movies: []
    }

    componentWillMount() {
        // fetch('http://cinebamo.it-students.fr/movies')

        fetch('http://cinebamo.it-students.fr/search/last?n_movie=6', { // n_movie=6 pour charger 6 films
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    movies: responseJson
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
                    <Text>Liste des films</Text>
                    <FlatList
                        data={this.state.movies}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <View>
                                    <Image
                                        style={{ width: 50, height: 60 }}
                                        source={{ uri: item.posterLink }}
                                    />
                                </View>
                                <View>
                                    <Text>{item.title}</Text>
                                </View>
                                <View>
                                    <Text>{item.summary}</Text>
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
         flexDirection:'column'
      }
});