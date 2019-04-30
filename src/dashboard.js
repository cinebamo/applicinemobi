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
                <View style={{ height: 100, flexDirection: 'row', margin: 20, padding: 20 }}>
                    <Image source={require('../asset/logo_cinebamo.png')} style={{ marginTop: 15, height: 50, width: 50 }} />
                    <ModalUser setParentState={this.setState.bind(this)} />

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
                                        style={{ width: 50, height: 50 }}
                                        source={{ uri: item.posterLink }}
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