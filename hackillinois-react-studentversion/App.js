import React, {Component} from 'react';
import {ActivityIndicator, View, Dimensions, ScrollView} from 'react-native';
import * as firebase from "firebase";
import {Button, Header, Text} from 'react-native-elements';

export default class App extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      responseJSON: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          french: child.val().french,
          english: child.val().english,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
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
    firebase.database().ref('/Users/TestUser/0').on(
        "value", snapshot => {
          this.setState({headerText: snapshot.val()})
        })
  }

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
                  text: 'Scroll',
                  style: {
                    color: 'white',
                    fontSize: 20
                  }
                }}
            />
          </View>



        </View>
    );
  }
}
