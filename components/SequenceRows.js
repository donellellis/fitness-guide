import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

//data
import workoutData from '../data/workoutData';

//variables
const sequence = workoutData.treadmill.sequence

export default class SequenceRows extends React.Component {

    render() {
        const remainingSequence = sequence.filter((item, index) => index >= this.props.sequenceIndex)
        return (
            <FlatList style={styles.container}
                data={remainingSequence}
                renderItem={({item}) =>
                    <View style={styles.sequenceRow}>
                        <Text style={styles.sequenceItem}>{item.time}:00</Text>
                        <Text style={styles.sequenceItem}>{item.paceName}</Text>
                        <Text style={styles.sequenceItem}>{item.pace} mph</Text>
                    </View>}
            />
        );
    }
}

const styles = StyleSheet.create({
    sequenceRow:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "orange"
    },
    sequenceItem:{
        fontSize: 20,
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 7,
        paddingBottom: 7
    }
});
