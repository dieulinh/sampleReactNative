import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    View
  } from 'react-native';
import { Icon } from 'react-native-elements';
export default class BookcaseItem extends Component {
  constructor(props) {
    super(props);
  }

  _onEditBook = (id) => {
    this.props.navigation.navigate('EditBook', {id: this.props.id});
  }
  render() {
    return (
      <TouchableOpacity onPress={ () => this.props.navigation.navigate('EditBook', {id: this.props.id, title: this.props.title}) } key={this.props.id}>
        <View style={styles.rowContainer}>
          <Image source={{ uri: this.props.thumbnail }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
          <View style={styles.rowText}>
            <Text numberOfLines={2}>{ this.props.title }</Text>
            <Text numberOfLines={1}>{ this.props.author }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 100,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#CCC',
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  title: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777'
  },
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#777'
  },
  thumbnail: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  rowText: {
    flex: 4,
    flexDirection: 'column'
  }
});
