import * as types from './types';

function handleError(e) {
  console.error(e);
}

export const exampleIncrement = () => {
  return { type: types.EXAMPLE_INCREMENT };
}

export const exampleDecrement = () => {
  return { type: types.EXAMPLE_DECREMENT };
}

export const getGists = () => {
  return (dispatch) => {
    fetch('https://api.github.com/gists').then(response => {
      return response.json();
    })
    .then(payload => {
      return dispatch({ type: types.GET_GISTS, payload });
    })
    .catch(handleError);
  };
};
