import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//data
import workoutData from '../data/workoutData';

export default class SequenceTimer extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
        }
    }


  render() {
    return (
        <View style = {styles.container}>
            <Text style={styles.timer}>{this.props.sequenceTime.toFixed(2)}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
    },
    timer: {
        color: 'orange',
        fontSize: '80',
    }
});
