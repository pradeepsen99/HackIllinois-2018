import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  Dimensions,
  ScrollView, ListView
} from 'react-native';
import * as firebase from "firebase";
import { StackNavigator } from 'react-navigation';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Item,
  Input,
  Form
} from "native-base";

const firebaseConfig = {
  apiKey: "AIzaSyCEmtGw8bbRb5FWp2RE4uFL46khLo1OGNk",
  authDomain: "scroll-f9e43.firebaseapp.com",
  databaseURL: "https://scroll-f9e43.firebaseio.com",
  projectId: "scroll-f9e43",
  storageBucket: "scroll-f9e43.appspot.com",
  messagingSenderId: "422097259298"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export class FirstActivity  extends Component {

  static navigationOptions =
      {
        title: 'Lectures',
      };

  OpenSecondActivity (rowData)
  {

    this.props.navigation.navigate('Second', { ListViewClickItemHolder: rowData });

  }
  constructor(props) {
    super(props);
    this.state = {
      database: null,
      isLoading: false,
      responseJSON: null,
      headerText: "Scroll App",
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
    };
    this.itemsRef = this.getRef().child('Users').child('TestUser');
  }

  getRef() {
    return firebaseApp.database().ref('/');
  }



  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var words = [];
      snap.forEach((child) => {
        words.push({
          Notes: child.val().Notes,
          Title: child.val().Title,
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(words)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  onButtonPressed() {
    this.database = firebase.database();
    firebase.database().ref('/Users/TestUser/2/Notes').on(
        "value", snapshot => {
          this.setState({headerText: snapshot.val()})
        })
  }

  ListViewItemSeparatorLine = () => {
    return (
        <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
        />
    );
  }

  /**
   * if (this.state.isLoading) {
      return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator/>
          </View>
      );
    }
   */

  render() {
    return (
        <View style={{
          flex: 1
        }}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={data =>
                  <ListItem style={{paddingLeft: 20}} onPress={this.OpenSecondActivity.bind(this, data.Notes)}>
                    <Text>
                      {data.Title}
                    </Text>
                  </ListItem>
              }
          />

          <Button
              title='GO' color='white'
              onPress={this.onButtonPressed.bind(this)}/>


        </View>
    );
  }
   _renderItem(item) {
    return (
        <ListItem />
    );
  }
}


class SecondActivity extends Component
{

  static navigationOptions =
      {
        title: 'Notes',
      };

  render()
  {
    return(
        <View>

          <Text> { this.props.navigation.state.params.ListViewClickItemHolder } </Text>

        </View>
    );
  }
}

export default Project = StackNavigator(
    {
      First: { screen: FirstActivity },

      Second: { screen: SecondActivity }
    });