import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

//components
import SequenceTimer from './components/SequenceTimer'
import SequenceRows from './components/SequenceRows'

//data
import workoutData from './data/workoutData';

//variables
const workoutTime = workoutData.time * 60 //converted to seconds
const sequence = workoutData.treadmill.sequence

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        time: workoutTime, //overall workout time in seconds
        displayTime: null, //converts overall workout time for display
        sequenceIndex: 0, 
        sequence: sequence[0], 
        sequenceStartTime: workoutTime, //sets the time the next sequence beings in releationship to overall time
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
      this.handleEndTimer()
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
    if (this.state.time >= 1){
      this.setState({
        time: this.state.time - 1
      }, this.selectSequence)
    }
    else if (this.state.time === 0){
      this.selectSequence()
    }
  }
    
  sequenceDecrement = () => {
    if (this.state.sequenceCountdown >= 1){
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

  handleEndTimer = () => {
    clearTimeout(timer)
    this.setState({
      paused: true
    })
    setTimeout(this.handlePauseTimer, 1000)
  }

  handleCancelTimer = () => {
    if (typeof timer !== 'undefined'){
      clearTimeout(timer)
      clearTimeout(sequenceTimer)
      this.setState({
        time: workoutTime,
        displayTime: null,
        sequenceIndex: 0,
        sequence: sequence[0],
        sequenceStartTime: workoutTime,
        sequenceTime: sequence[0].time * 60,
        sequenceCountdown: sequence[0].time * 60,
        sequenceDisplay: null,
        paused: true
      }, this.convertAllNumbersToTime)
    }
  }

  render() {
    const sequenceIndex = this.state.sequenceIndex
    const displayTime = this.state.displayTime
    const sequenceDisplay = this.state.sequenceDisplay
    const paused = this.state.paused
    let button

    //toggles button between start and pause
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

    // const sequenceList = sequence.map((sequence, index) => (
    //   <tr key={sequence}>
    //     <td>{sequence.time}</td>
    //     <td>{sequence.paceName}</td>
    //     <td>{sequence.pace}</td>
    //   </tr>
    // ))


    return (
      <View style={styles.container}>
        <Text style={styles.timer}>{displayTime}</Text>
        <SequenceTimer 
          sequenceDisplay={sequenceDisplay}
          />
        {button}
        <Button
          title="reset"
          onPress={this.handleCancelTimer}
        />
        <SequenceRows/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
