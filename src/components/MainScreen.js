import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../actions';


const Gist = ({gist, onPress}) => {
  return (
    <View>
      <TouchableHighlight onPress={() => onPress(gist)} >
        <Text>{gist.id}</Text>
      </TouchableHighlight>
    </View>
  )
}

class MainScreen extends Component {
  constructor () {
    super();
    this.onPress = this.onPress.bind(this);
  }
  componentWillMount () {
    this.props.actions.getGists();
  }
  onPress (gist) {
    this.props.navigation.navigate('Gist', {gist})
  }
  render () {
    const { gists } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to React Native! </Text>
        {gists && gists.map(gist => <Gist key={gist.id} gist={gist} onPress={this.onPress} />)}
      </View>
    );
  }
}

function mapStateToProps ({gists}) {
  return { gists }
}
function mapDispatchToProps (dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

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
