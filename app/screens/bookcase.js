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
      books: []
    }
  }

  _renderItem = ({ item }) => (
    <BookcaseItem
      key={item.id}
      id={item.id}
      title={item.title}
      author={item.author}
      thumbnail={item.thumbnail}
      navigation={this.props.navigation}
    />
  )

  _keyExtractor = (item, index) => item.id

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author, thumbnail, id } = doc.data();
      books.push({
        key: doc.id, doc, id, title, author, thumbnail
      });
      this.setState({books, loading: false});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
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
