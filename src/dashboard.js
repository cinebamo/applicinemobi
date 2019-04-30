import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import ModalUser from './modaluser.js';

type Props = {};
export default class Dashboard extends Component<Props> {

    state = {
        movies: []
    }

    componentWillMount() {
        // fetch('http://cinebamo.it-students.fr/movies')

        fetch('http://cinebamo.it-students.fr/search/last?n_movie=6', { // n_movie=6 pour charger 6 films
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
            },
            
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                console.log(responseJson[0].title);
                //mettre dans movies[] les resultats
                console.log("contenu de movies : ")
                this.setState({
                    movies: responseJson
                  })
                console.log(this.state.movies[0]);
                if (datas !== '') {
                    
                    
                    _storeData = async () => {
                        try {
                            await AsyncStorage.setItem('TOKEN', response._id);
                        } catch (error) {
                            // Nok token
                        }
                    };
                } else {

                    alert(datas);
                }
            })
    }

    render() {
        return (

            <View style={styles.container}>
            <View style={{ height: 100, flexDirection: 'row', margin: 20, padding: 20 }}>
          <Image source={require('../asset/logo_cinebamo.png')} style={{ marginTop: 15, height: 50, width: 50 }} />
            <ModalUser setParentState={this.setState.bind(this)} />
            
        </View>

            <View style={styles.form}>
                <Text>Liste des films</Text>
                <FlatList
                    data={this.state.movies}
                    renderItem={({ item }) => (
                        <View>
                            <View>
                                <Image 
                                style={{width: 50, height: 50}} 
                                source={{uri: item.posterLink}}
                                />
                            </View>
                            <View>
                                <Text>{item.title}</Text>
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
    form: {
        flexDirection: 'column',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        flex: 1,
    },
});