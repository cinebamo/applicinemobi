import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';

type Props = {};
export default class SearchView extends Component<Props> {

    state = {
        search_TitleActor: "",
        search_Category: ""
    }

    componentWillMount() {

    }

    _buttonSearch() {
        // Chercher les films

        var canSearch = true
        if((typeof(this.state.search_TitleActor) === 'undefined') && (typeof(this.state.search_Category) === 'undefined')) {
            // console.log("search_TitleActor : "+ this.state.search_TitleActor)
            // console.log("search_Category : "+ this.state.search_Category)
            // console.log("search_TitleActor type: "+ typeof this.state.search_TitleActor)
            // console.log("search_Category type: "+ typeof this.state.search_Category)
            // console.log("search_TitleActor length: "+  this.state.search_TitleActor.length)
            // console.log("search_Category length: "+ this.state.search_Category.length)
            canSearch = false
        }
        if((this.state.search_TitleActor.length == 0) && (this.state.search_Category.length == 0)) {
            canSearch = false
        }
        // if((typeof this.search_TitleActor !== 'undefined') && (typeof this.search_Category !== 'undefined')) {
        //     canSearch = true
        // }
        //console.log("canSearch = " + canSearch)
        if (canSearch) {
            var route = 'http://cinebamo.it-students.fr/search/?'
            var String_titleGet = 'title_actor=' + this.state.search_TitleActor
            var String_categGet = '&category=' + this.state.search_Category
            var getRoute = route + String_titleGet + String_categGet
            fetch(getRoute, { // n_movie=6 pour charger 6 films
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
                //console.log(movies)
                this.props.setParentState({ titreView: 'Résultat de la recherche', movies: responseJson, bool_movieView: false })            
            }).catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
                console.log('There has been a problem with your fetch operation: ' + error.message);
               
                throw error;
            });
        } else {
            this.props.setParentState({ titreView: 'Recherche impossible, entrez un titre ou choisir une catégorie', bool_movieView: false })
            this.SearchSix()
        }
        //mettre a jour le parent
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
                this.props.setParentState({
                    movies: responseJson
                })
                console.log(responseJson)
            }).catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
                console.log('There has been a problem with your fetch operation: ' + error.message);
                // ADD THIS THROW error
                throw error;
            });
    }
    render() {
        return (

            <View style={styles.container}>
                
                <View style={styles.viewSearch}>
                    <TextInput style={styles.input}
                        placeholder="Titre ou Acteur"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ search_TitleActor: text }) }} />
                    <TouchableOpacity
                        style={styles.buttonSearch}
                        onPress={() => {
                            this._buttonSearch();
                        }}>
                        <Text>Rechercher</Text>
                    </TouchableOpacity>
                </View>
              

                {/* <Picker
                    selectedValue={this.state.search_Category}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ search_Category: itemValue })
                    }> */}
                    <Picker
                    note
                    mode="dropdown"
                    style={{ width: 160 }}
                    selectedValue={this.state.search_Category}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ search_Category: itemValue })}
                    >
                    <Picker.Item label="Categorie" value="" />
                    <Picker.Item label="Action" value="ACTION" />
                    <Picker.Item label="Comedie" value="COMEDY" />
                    <Picker.Item label="Crime" value="CRIME" />
                    <Picker.Item label="Drame" value="DRAME" />
                    <Picker.Item label="Horreur" value="HOROR" />
                    <Picker.Item label="Romance" value="ROMANCE" />
                    <Picker.Item label="Science-Fiction" value="SCI-FI" />

                </Picker>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewSearch: {
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    container: {
        flexDirection: 'column'
    },
    input: {
        height: 40,
        borderColor: 'silver',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 5,
        marginRight: 5,
        flex:1
        //padding: 5,
    },
    pickerStyle: {
        
        margin:5
    },
    buttonSearch: {
        backgroundColor: 'silver',
        borderRadius: 5,
        marginRight:5,
        padding:5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});