import React, { Component } from 'react';
import {  StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


type Props = {};
export default class FilmView extends Component<Props> {

    state = {
        movieInfo = ''
    }

    // componentWillMount() {
    //     //this.state.movieInfo = this.props.get_currentMovie()
    //    // console.log(this.state)
    // }

    render() {
        return (

            <View style={styles.container}>

               
                <Text>FilmView Text here</Text>
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

});