import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, Text, Title } from 'native-base';
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
    this.renderListItem = this.renderListItem.bind(this);
  }
  componentWillMount () {
    this.props.actions.getGists();
  }
  onPress (gist) {
    this.props.navigation.navigate('Gist', {gist})
  }
  renderListItem (gist) {
    return (
      <ListItem key={gist.id} onPress={() => this.onPress(gist)}>
        <Text>{gist.id}</Text>
      </ListItem>
    )
  }
  render () {
    const { gists } = this.props
    return (
      <Container>
        <Content>
          <List>
            {gists && gists.map(this.renderListItem)}
          </List>
        </Content>
      </Container>
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
