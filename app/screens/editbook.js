import React, { Component  } from 'react';
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
      </View>
      <Button title="Back to Books"
        onPress={ () => this.props.navigation.navigate('Tabs') }
      />
    );
  };
};
