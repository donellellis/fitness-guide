import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SequenceTimer extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.timer}>{this.props.sequenceDisplay}</Text>
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
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30,
    },
    timer: {
        color: 'orange',
        fontSize: '80',
    }
});
