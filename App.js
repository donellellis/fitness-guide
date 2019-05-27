import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

//components
import SequenceTimer from './components/SequenceTimer'

//data
import workoutData from './data/workoutData';

//variables
const workoutTime = workoutData.time
const sequence = workoutData.treadmill.sequence

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        time: workoutTime,
        sequenceIndex: 0,
        sequence: sequence[0],
        sequenceStartTime: workoutTime,
        sequenceTime: sequence[0].time,
        paused: true
    }
  }

  selectSequence = () => {
      index = this.state.sequenceIndex
      if (this.state.time === (this.state.sequenceStartTime - this.state.sequenceTime)){
        this.setState({
          sequenceIndex: index + 1,
          sequence: sequence[index + 1],
          sequenceStartTime: this.state.time,
          sequenceTime: sequence[index + 1].time
        })
      }
  }

  decrement = () => {
    if (this.state.time === 1) {
      this.setState({
        time: this.state.time - 1
      }, this.handlePauseTimer
      )
    }
    else if (this.state.time > 1) {
      this.setState({
        time: this.state.time - 1
      }, this.selectSequence)
    } 
  }

  handlePlayTimer = () => {
    this.setState({
      paused: false
    })
    timer = setInterval(this.decrement, 60000)
  }

  handlePauseTimer = () => {
    clearTimeout(timer)
    this.setState({
      paused: true
    })
  }

  handleCancelTimer = () => {
    clearTimeout(timer)
    this.setState({
      time: workoutTime,
      sequence: sequence[0],
      sequenceStartTime: workoutTime,
      sequenceTime: sequence[0].time,
      paused: true
    })
  }

  render() {
    const time = this.state.time
    const sequenceTime = this.state.sequenceTime
    const paused = this.state.paused
    let button

    if (paused){
      button = 
        <Button 
        title="start"
        onPress={this.handlePlayTimer}
        />
    } else {
      button = 
      <Button 
        title="pause"
        onPress={this.handlePauseTimer}
        />
    }

    return (
      <View style={styles.container}>
        <Text style={styles.timer}>{time} min</Text>
        <Text style={styles.timer}>{this.state.sequenceStartTime - this.state.sequenceTime}</Text>
        <SequenceTimer sequenceTime={sequenceTime}/>
        {button}
        <Button
          title="reset"
          onPress={this.handleCancelTimer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#262626',
    paddingTop: 20,
  },
  timer: {
    color: 'white',
    fontSize: '30'
  }
});
