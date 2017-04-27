import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './reducers';
import MainScreen from './components/MainScreen';

/**
 * autoRehydrate is a store enhancer that will automatically shallow merge the
 * persisted state for each key. Additionally it queues any actions that are
 * dispatched before rehydration is complete, and fires them after rehydration
 * is finished.
 */
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, createLogger()), autoRehydrate());

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
        <MainScreen />
      </Provider>
    );
  }
}
