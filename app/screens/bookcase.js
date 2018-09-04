import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  StatusBar,
  StyleSheet,
  FlatList,
  Text,
  View
} from 'react-native';

import BookcaseItem from './bookcaseitem';

export default class Boookcase extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('books');
    this.unsubscribe = null;
    this.state = {
      loading: true,
      books: [
        {
          id: 1,
          title: 'Harry Porter and the Goblet of Fire',
          author: 'J. K. Rowling',
          thumbnail: 'https://covers.openlibrary.org/w/id/7984916-M.jpg'
        },
        {
          id: 2,
          title: 'The Hobbit',
          author: 'J. R. R. Tolkien',
          thumbnail: 'https://covers.openlibrary.org/w/id/6979861-M.jpg'
        },
        {
          id: 3,
          title: '1984',
          author: 'George Orwell',
          thumbnail: 'https://covers.openlibrary.org/w/id/7222246-M.jpg'
        }
      ]
    }
  }

  _renderItem = ({ item }) => (
    <BookcaseItem
      id={item.id}
      title={item.title}
      author={item.author}
      thumbnail={item.thumbnail}
    />
  )

  _keyExtractor = (item, index) => item.id

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author, thumbnail } = doc.data();
      books.push({
        key: doc.id, doc, title, author, thumbnail
      });
      this.setState({books, loading: false});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    // return fetch('https://console.firebase.google.com/project/book-case-4025c/books')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({books: responseJson});
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.state.books}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  }
});
