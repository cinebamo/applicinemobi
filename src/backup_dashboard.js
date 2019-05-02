import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ModalUser from './modaluser.js';
import SearchView from './searchView';
// import FilmView from './filmView';
type Props = {};
export default class Dashboard extends Component<Props> {

    state = {
        movies: [],
        titreView: 'Liste des films',
        bool_movieView: false,
        currentMovie: '',
        showCommentModal: false
    }

    componentWillMount() {
        this.SearchSix()
    }

    SearchSix() {
        var n_movie = 6
        var addr = 'http://cinebamo.it-students.fr/search/last?n_movie='
        var fetch_addr = addr + n_movie
        fetch(fetch_addr, { // n_movie=6 pour charger 6 films
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

    // get_currentMovie() {
    //     return this.state.currentMovie;
    // }

    MovieTouch(filmInfo) {

        this.setState({ currentMovie: filmInfo })
        this.state.bool_movieView = true

    }

    _buttonComment() {
        this.state.showCommentModal = true
    }
    render() {
        return (

            <View style={styles.container}>
                <View style={styles.modalStyle}>
                    <Image source={require('../asset/logo_cinebamo.png')} style={styles.modalLogoStyle} />
                    <ModalUser setParentState={this.setState.bind(this)} />

                </View>
                <View>
                    <SearchView setParentState={this.setState.bind(this)} />
                </View>
                {
                    (this.state.bool_movieView) ? (
                        <View>
                                <FlatList
                                    data={this.state.currentMovie}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (

                                       
                                            <Text>{item.title}</Text>
                                            <Text>{item.summary}</Text>
                                        </TouchableOpacity>
                                    )}>
                                </FlatList>
                            <View style={styles.imageFilmView}>
                                <Image
                                    style={styles.imageFilmStyle}
                                    source={{ uri: this.state.currentMovie.posterLink }}
                                />
                            </View>
                            <Text>Titre : {this.state.currentMovie.title}</Text>
                            <Text>Categorie : {this.state.currentMovie.category}</Text>
                            <Text>Note : {this.state.currentMovie.score}/10</Text>
                            <Text>Acteurs : {this.state.currentMovie.actors.join(', ')}</Text>
                            <Text>Resumé : {this.state.currentMovie.summary}</Text>

                            <TouchableOpacity
                                style={styles.buttonComment}
                                onPress={() => {
                                    this._buttonComment();
                                }}>
                                <Text style={{ fontSize: 30 }}>Commenter</Text>
                            </TouchableOpacity>
                            {(this.state.showCommentModal) ? (
                                <View>
                                    <Text>Modal Comment ici si showCommentModal = true</Text>
                                </View>
                            ) : (
                                <View>
                                    
                                </View>
                            )}
                        </View>

                    ) : (
                            <View style={styles.form}>
                                <Text>{this.state.titreView}</Text>
                                <FlatList
                                    data={this.state.movies}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (

                                        <TouchableOpacity 
                                        
                                        onPress={() => this.MovieTouch(item)}>
                                            <Image
                                                style={{ width: 50, height: 60 }}
                                                source={{ uri: item.posterLink }}
                                            />
                                            <Text>{item.title}</Text>
                                            <Text>{item.summary}</Text>
                                        </TouchableOpacity>
                                    )}>
                                </FlatList>
                            </View>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalStyle: {
        height: 100,
        flexDirection: 'row',
        //Le margin et Padding "Bouscule" les autre view  
        marginTop: 20,

    },
    modalLogoStyle: {
        marginTop: 30,
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
        flexDirection: 'column'
    },
    imageFilmView: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    imageFilmStyle: {
        height: 150,
        width: 100
    },
    buttonComment: {
        backgroundColor: 'silver',
        borderRadius: 5,
        marginRight:5,
    }
});