import React, { Component  } from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image
} from 'react-native';

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      title: this.props.navigation.state.params.title,
      author: this.props.author,
      thumbnail: this.props.thumbnail
    };

  }
   _saveBook() {
    var db = firebase.firestore();
    var bookId = this.props.navigation.state.params.id;
    var title = this.state.title;
    var sfDocRef = db.collection("books").doc(bookId);
    db.runTransaction((transaction) => {
      return transaction.get(sfDocRef).then(function(sfDoc) {
        if (!sfDoc.exists) {
            throw "Document does not exist!";
        }

        var newBook = sfDoc.data();
        transaction.update(sfDocRef, { title: title });
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

        />
        <TextInput
          style={ { height: 40, borderColor: 'gray', borderWidth: 1 } }
          onChangeText={(author) => this.setState({author})}
          value={this.state.author}
        />
        <Image source={ { uri: this.state.thumbnail } } resizeMode="contain"/>
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
