import { combineReducers } from 'redux';
import ExampleReducer from './ExampleReducer';
import GistsReducer from './GistsReducer';

export default combineReducers({
  example: ExampleReducer,
  gists: GistsReducer
});
