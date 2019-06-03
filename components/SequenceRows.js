import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

//data
import workoutData from "../data/workoutData";

//variables
const sequence = workoutData.treadmill.sequence;

export default class SequenceRows extends React.Component {
  render() {
    const sequenceIndex = this.props.sequenceIndex;
    const remainingSequence = sequence.filter(
      (item, index) => index >= sequenceIndex
    );
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ time: "time", paceName: "pace", pace: "speed" }]}
          renderItem={({ item }) => (
            <View style={styles.sequenceHeader}>
              <Text style={styles.sequenceHeaderItem}>{item.time}</Text>
              <Text style={styles.sequenceHeaderItem}>{item.paceName}</Text>
              <Text style={styles.sequenceHeaderItem}>{item.pace}</Text>
            </View>
          )}
        />
        <FlatList
          data={remainingSequence}
          renderItem={({ item, index }) => (
            <View
              style={
                index === sequenceIndex
                  ? styles.currentSequenceRow
                  : styles.sequenceRow
              }
            >
              <Text style={styles.sequenceItem}>{item.time}:00</Text>
              <Text style={styles.sequenceItem}>{item.paceName}</Text>
              <Text style={styles.sequenceItem}>{item.pace} mph</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: 10
  },
  currentSequenceRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "orange"
  },
  sequenceHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sequenceRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(80, 80, 80)",
    borderTopWidth: 1,
    borderTopstyle: "solid",
    borderTopColor: "rgb(70, 70, 70)"
  },
  sequenceHeaderItem: {
    fontSize: 18,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    color: "white"
  },
  sequenceItem: {
    fontSize: 18,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 7,
    paddingBottom: 7
  }
});
