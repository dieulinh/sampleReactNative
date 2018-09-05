import React, { Component  } from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      author: this.props.author,
      thumbnail: this.props.thumbnail
    };

  }
   _saveBook() {
    var db = firebase.firestore();
    console.log()
    console.log(this.props.id);
    var sfDocRef = db.collection("books").doc(this.props.id);
    db.runTransaction((transaction) => {
      return transaction.get(sfDocRef).then(function(sfDoc) {
        if (!sfDoc.exists) {
            throw "Document does not exist!";
        }

        var newBook = sfDoc.data();
        transaction.update(sfDocRef, { title: this.state.title });
        return newBook;
      });
    }).then((newBook) => {
      console.log('new data', newBook);
    }).catch((error) => console.error(error))

  }
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Edit Book</Text>
        <TextInput
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
        />
        <TextInput
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={(author) => this.setState({author})}
          value={this.state.author}
        />
        <Button title="Save book"
          onPress={ () => this._saveBook() }
        />
        <Button title="Back to Books"
          onPress={ () => this.props.navigation.navigate('Tabs') }
        />
      </View>
    );
  };
};
