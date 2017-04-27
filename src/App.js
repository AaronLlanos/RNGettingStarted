import React, { Component } from 'react';

import { AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './reducers';
import MainScreen from './components/MainScreen';
import GistScreen from './components/GistScreen';

/**
 * autoRehydrate is a store enhancer that will automatically shallow merge the
 * persisted state for each key. Additionally it queues any actions that are
 * dispatched before rehydration is complete, and fires them after rehydration
 * is finished.
 */
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, createLogger()), autoRehydrate());

/**
 * Will pass the navigator as a child of the app to ensure redux loads before the
 * app does. This also allows for stack to be seen on high level app intro.
 * @type {[type]}
 */
const Navigator = StackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: { title: 'Home' }
  },
  Gist: {
    screen: GistScreen,
    navigationOptions: ({navigation}) => {
      const { gist } = navigation.state.params;
      const title = (gist.owner && gist.owner.login) || gist.id;
      return { title }
    }
  }
});

export default class App extends Component {

  constructor () {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount () {
    // Store rehydration
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render () {
    if (!this.state.rehydrated) { return null; }
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
