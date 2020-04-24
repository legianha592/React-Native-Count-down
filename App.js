import React from 'react';
import {Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import { render } from 'react-dom';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      min: 25,
      second: 0,
      bigTime: true,
      counting: false,
    }
  }

  startDecrease(){
    console.log("this is did count");
    if (this.state.counting === false){
      this.interval = setInterval(this.decrease, 1000);
      this.setState({
        counting: true,
      })
    }

  }

  decrease = () => {
    if (this.state.second>0){
      this.setState(prevState => ({
        second: prevState.second-1,
      }))
    }
    else{
      this.setState(prevState => ({
        min: prevState.min-1,
        second: 59
      }))
    }
  }

  stopDecrease(){
    console.log("this is stop count");
    if (this.state.counting === true){
      clearInterval(this.interval);
      this.setState({
        counting: false,
      })
    }

  }

  resetTime(){
    if (this.state.bigTime === true){
      this.setState({
        min: 25,
        second: 0,
      })
    }
    else{
      this.setState({
        min: 5,
        second: 0,
      });
    }
    this.stopDecrease();
  }

  switchTime(){
    if (this.state.bigTime === true){
      this.setState({
        bigTime: false,
        min: 5,
        second: 0,
      })
    }
    else{
      this.setState({
        bigTime: true,
        min: 25,
        second: 0,
      }) 
    }
    this.stopDecrease()
  }

  render(){
    var string_min = this.state.min;
    var string_second = this.state.second;
    if (this.state.min<10){
      string_min = "0" + this.state.min;
    }
    if (this.state.second<10){
      string_second = "0" + this.state.second;
    }
    console.log("render = ", this.state.counting, string_min, string_second)
    return (
      <View style={styles.allview}>
          <Button
            title="switch"
            onPress={() => this.switchTime()}/>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.text}>
              {string_min}:{string_second}
            </Text>
          </View>
          <Button 
            title="start" 
            onPress={() => this.startDecrease()}
          />
          <Button 
            title="stop"
            onPress={() => this.stopDecrease()}
          />
          <Button
            title="reset"
            onPress={() => this.resetTime()}
            /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allview:{
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  }
});
