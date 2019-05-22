import React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

//data
import workoutData from './data/workoutData';

//variables
workoutTime = workoutData.time

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        time: workoutTime,
        paused: true
    }
  }

  decrement = () => {
    if (this.state.time === 1) {
      this.setState({
        time: this.state.time - 1
      }, this.handlePauseSequence
      )
    }
    else if (this.state.time > 1) {
      this.setState({
        time: this.state.time - 1
      })
    } 
  }

  handlePlaySequence = () => {
    this.setState({
      paused: false
    })
    timer = setInterval(this.decrement, 1000)
  }

  handlePauseSequence = () => {
    clearTimeout(timer)
    this.setState({
      paused: true
    })
  }

  handleCancelSequence = () => {
    clearTimeout(timer)
    this.setState({
      time: workoutTime,
      paused: true
    })
  }

  render() {
    let time = this.state.time
    let paused = this.state.paused
    let button

    if (paused){
      button = 
        <Button 
        title="start"
        onPress={this.handlePlaySequence}
        />
    } else {
      button = 
      <Button 
        title="pause"
        onPress={this.handlePauseSequence}
        />
    }

    return (
      <View style={styles.container}>
        <Text style={styles.timer}>{time} min</Text>
        {button}
        <Button
          title="reset"
          onPress={this.handleCancelSequence}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    color: 'white',
    fontSize: '30'
  }
});
