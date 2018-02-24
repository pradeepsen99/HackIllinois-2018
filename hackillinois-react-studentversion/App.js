import React, {Component} from 'react';
import {ActivityIndicator, View, Dimensions, ScrollView} from 'react-native';
import * as firebase from "firebase";
import {Button, Header} from 'react-native-elements';

export default class App extends Component {

  /**
   * Hides the stack bar from showing up
   * @type {{header: null}}
   */
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: 2,
      responseJSON: null,
      headerText: null,
    };
  }

  /**
   * This function takes the latitude and longitude values given in and inputs it into the mtd api and makes a GET
   * for all the stops nearest to the latitude and longitude given in.
   */
  getDatabase() {
    fetch('https://hackillinois-2018.firebaseio.com/.json?print=pretty')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        responseJSON: responseJson,
        isLoading: false,
      }, function () {

      });
    })
    .catch((error) => {
      //errors
    });

  }

  /**
   * This runs when the app starts to load up the data on the stops.
   */
  componentDidMount() {
    //this.getDatabase();
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCEmtGw8bbRb5FWp2RE4uFL46khLo1OGNk',
      authDomain: 'scroll-f9e43.firebaseapp.com',
      databaseURL: 'https://scroll-f9e43.firebaseio.com',
      projectId: 'scroll-f9e43',
      storageBucket: 'scroll-f9e43.appspot.com',
      messagingSenderId: '422097259298'
    });
  }

  onButtonPressed() {
    this.database = firebase.database();
    firebase.database().ref('/Users/TestUser/0/Notes').on(
        "value", snapshot => {
          this.setState({headerText: snapshot.val()})
        })
  }

  /**
   * render menu.
   * This one actually loads up what we see.
   * @returns {*}
   */
  render() {
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator/>
          </View>
      );
    }

    return (
        <View style={{
          flex: 1
        }}>
          <View>
            <Header
                centerComponent={{
                  text: this.state.headerText,
                  style: {
                    color: 'white',
                    fontSize: 20
                  }
                }}
            />
          </View>
          <Button
              title='GO' color='white'
              onPress={this.onButtonPressed.bind(this)}/>
        </View>
    );
  }
}
