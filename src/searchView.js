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
        console.log("search_TitleActor : " + search_TitleActor)
        console.log("search_Category : " + search_Category)
    }

    render() {
        return (

            <View style={styles.container}>
                {/* <View style={{flex:1}}> */}
                <View style={styles.viewSearch}>
                    <TextInput style={styles.input}
                        placeholder="Titre ou Acteur"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => { this.setState({ search_TitleActor: text }) }} />
                    <TouchableOpacity
                        style={styles.buttonSearch}
                        onPress={() => {
                            this._buttonSearch(true);
                        }}>
                        <Text style={{ fontSize: 30 }}>Go !</Text>
                    </TouchableOpacity>
                </View>
                {/* </View> */}

                <Picker
                    selectedValue={this.state.search_Category}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ search_Category: itemValue })
                    }>
                    <Picker.Item label="Categorie" value="" />
                    <Picker.Item label="Action" value="ACTION" />
                    <Picker.Item label="Comedie" value="COMEDY" />
                    <Picker.Item label="Crime" value="CRIME" />
                    <Picker.Item label="Drame" value="DRAME" />
                    <Picker.Item label="Horor" value="HOROR" />
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
        //flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        //backgroundColor: '#ff0000',
        flexDirection: 'column'
    },
    input: {
        height: 40,
        borderColor: 'silver',
        borderWidth: 1,

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
    }
});