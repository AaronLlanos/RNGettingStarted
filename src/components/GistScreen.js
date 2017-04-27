import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class GistScreen extends Component {
  render () {
    const { gist } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to the Gist! </Text>
        <Text>Last Updated: </Text>
        <Text>{gist.updated_at}</Text>
        <Text>Number of Files: </Text>
        <Text>{Object.keys(gist.files).length}</Text>
        <Text>URL: </Text>
        <Text>{gist.url}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
