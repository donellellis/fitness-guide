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
        time: workoutTime * 60, //overall workout time in seconds
        displayTime: null, //converts overall workout time for display
        sequenceIndex: 0, 
        sequence: sequence[0], 
        sequenceStartTime: workoutTime * 60, //sets the time the next sequence beings in releationship to overall time
        sequenceTime: sequence[0].time * 60, //length of time for workout sequence in seconds
        sequenceCountdown: sequence[0].time * 60, //counts down for sequence
        sequenceDisplay: null, //converts sequence count down for display
        paused: true
    }
  }


  componentDidMount(){
    this.convertAllNumbersToTime()
  }

  convertAllNumbersToTime = () => {
    this.convertOverallNumberToTime()
    this.convertNumberToTime()
  }

  convertOverallNumberToTime = () => {
    let timeInSeconds = this.state.time
    let minutes = Math.floor(timeInSeconds / 60)
    let seconds = (timeInSeconds % 60)
    let secondsDisplay = seconds.toString()
    if (seconds < 10) {
      secondsDisplay = '0' + secondsDisplay
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
    index = this.state.sequenceIndex
    this.convertOverallNumberToTime()
    if (this.state.time === 0){
      this.handleEndSequence()
    }
    else {
    if (this.state.time === (this.state.sequenceStartTime - this.state.sequenceTime)){
      this.setState({
        sequenceIndex: index + 1,
        sequence: sequence[index + 1],
        sequenceStartTime: this.state.time,
        sequenceTime: sequence[index + 1].time * 60,
        sequenceCountdown: (sequence[index + 1].time * 60) + 1
      })
    }
    }
    
  }

  decrement = () => {
    this.setState({
      time: this.state.time - 1
    }, this.selectSequence)
    // if (this.state.time === 1) {
    //   this.setState({
    //     time: this.state.time - 1
    //   }, this.selectSequence
    //   )
    // }
    // else if (this.state.time > 1) {
    //   this.setState({
    //     time: this.state.time - 1
    //   }, this.selectSequence)
    // } 
  }

  sequenceDecrement = () => {
    if (this.state.sequenceCountdown === 1){
      this.setState({
        sequenceCountdown: this.state.sequenceCountdown - 1
      }, this.convertNumberToTime)
    }
    else if (this.state.sequenceCountdown > 1) {
      this.setState({
        sequenceCountdown: this.state.sequenceCountdown - 1
      }, this.convertNumberToTime)
    }
    
  }

  handlePlayTimer = () => {
    this.setState({
      paused: false
    })
    timer = setInterval(this.decrement, 1000) //sets interval for overall workout timer
    sequenceTimer = setInterval(this.sequenceDecrement, 1000) //sets interval for sequence timer
  }

  handlePauseTimer = () => {
    clearTimeout(timer)
    clearTimeout(sequenceTimer)
    this.setState({
      paused: true
    })
  }

  handleEndSequence = () => {
    clearTimeout(timer)
    this.setState({
      paused: true
    })
    setTimeout(this.handlePauseTimer, 1000)
  }

  handleCancelTimer = () => {
    clearTimeout(timer)
    clearTimeout(sequenceTimer)
    this.setState({
      time: workoutTime * 60,
      displayTime: null,
      sequenceIndex: 0,
      sequence: sequence[0],
      sequenceStartTime: workoutTime * 60,
      sequenceTime: sequence[0].time * 60,
      sequenceCountdown: sequence[0].time * 60,
      sequenceDisplay: null,
      paused: true
    }, this.convertAllNumbersToTime)

  }

  render() {
    const displayTime = this.state.displayTime
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
        <Text style={styles.timer}>{displayTime}</Text>
        <Text style={styles.timer}>{this.state.time}</Text>
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
