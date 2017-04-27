import * as types from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
   case REHYDRATE:
     var incoming = action.payload.gists;
     if (incoming) { return Object.assign([], state, incoming) }
     return state;
   case types.GET_GISTS:
     return  Object.assign([], state, action.payload);
   default:
     return state;
 }
};
