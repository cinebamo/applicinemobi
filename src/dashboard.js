import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';


type Props = {};
export default class Dashboard extends Component<Props> {

    state = {

        movies: []
    }

    componentWillMount() {
        // fetch('http://cinebamo.it-students.fr/movies')
        fetch('http://192.168.33.15:3000/movies')
            .then(function (result) { return result.json({}) })
            .then(function (datas) { this.setState.movies = datas }.bind(this))
    }

    render() {
        return (
            <View style={styles.form}>
                <Text>Liste des films</Text>
                <FlatList
                    data={this.state.movies}
                    renderItem={({ item }) => (
                        <View>
                            <View>
                                <Image source={{ uri: item.posterLink }} />
                            </View>
                            <View>
                                <Text>{item.title}</Text>
                            </View>
                        </View>
                    )}>
                </FlatList>
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