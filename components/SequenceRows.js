import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

//data
import workoutData from '../data/workoutData';

//variables
const sequence = workoutData.treadmill.sequence

export default class SequenceRows extends React.Component {

    render() {
        return (
            <FlatList style={styles.container}
                data={sequence}
                renderItem={({item}) =>
                    <View style={styles.sequenceRow}>
                        <Text style={styles.sequenceItem}>{item.time}</Text>
                        <Text style={styles.sequenceItem}>{item.paceName}</Text>
                        <Text style={styles.sequenceItem}>{item.pace}</Text>
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
        fontSize: 20
    }
});
