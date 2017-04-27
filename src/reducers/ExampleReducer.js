import * as types from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = {
  counter: 0
};

export default (state = INITIAL_STATE, action) => {
 switch (action.type) {
   case REHYDRATE:
     var incoming = action.payload.example;
     if (incoming) { return {...state, ...incoming}; }
     return state;
   case types.EXAMPLE_INCREMENT:
     return { ...state, counter: state.counter + 1 };
   case types.EXAMPLE_DECREMENT:
     return { ...state, counter: state.counter - 1 };
   default:
     return state;
 }
};
