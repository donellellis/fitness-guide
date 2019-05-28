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
        time: workoutTime * 60,
        displayTime: null,
        sequenceIndex: 0,
        sequence: sequence[0],
        sequenceStartTime: workoutTime,
        sequenceTime: sequence[0].time,
        sequenceCountdown: sequence[0].time * 60,
        sequenceDisplay: null,
        paused: true
    }
  }

  componentDidMount(){
    this.convertOverallNumberToTime()
    this.convertNumberToTime()
  }

  convertOverallNumberToTime = () => {
    let timeInSeconds = this.state.time
    let minutes = Math.floor(timeInSeconds / 60)
    let seconds = (timeInSeconds % 60)
      let secondsDisplay = seconds.toString()
      if (seconds < 10) {
        secondsDisplay = '0'+ secondsDisplay
      }
      this.setState({
        displayTime: minutes + ':' + secondsDisplay
      })
  }

  convertNumberToTime = () => {
      let timeInSeconds = this.state.sequenceCountdown
      let minutes = Math.floor(timeInSeconds / 60)
      let seconds = (timeInSeconds % 60)
      let secondsDisplay = seconds.toString()
      if (seconds < 10) {
        secondsDisplay = '0'+ secondsDisplay
      }
      this.setState({
        sequenceDisplay: minutes + ':' + secondsDisplay
      })
    }

  selectSequence = () => {
      this.convertOverallNumberToTime()
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

  sequenceDecrement = () => {
    this.setState({
      sequenceCountdown: this.state.sequenceCountdown - 1
    }, this.convertNumberToTime)
  }

  handlePlayTimer = () => {
    this.setState({
      paused: false
    })
    timer = setInterval(this.decrement, 1000)
    sequenceTimer = setInterval(this.sequenceDecrement, 1000)
  }

  handlePauseTimer = () => {
    clearTimeout(timer)
    clearTimeout(sequenceTimer)
    this.setState({
      paused: true
    })
  }

  handleCancelTimer = () => {
    clearTimeout(timer)
    clearTimeout(sequenceTimer)
    this.setState({
      time: workoutTime,
      sequence: sequence[0],
      sequenceStartTime: workoutTime,
      sequenceTime: sequence[0].time,
      sequenceCountdown: null,
      paused: true
    })
  }

  render() {
    const time = this.state.time
    const sequenceDisplay = this.state.sequenceDisplay
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
        <Text style={styles.timer}>{this.state.displayTime} min</Text>
        <Text style={styles.timer}>{this.state.sequenceStartTime - this.state.sequenceTime}</Text>
        <SequenceTimer 
          sequenceDisplay={sequenceDisplay}
          />
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
