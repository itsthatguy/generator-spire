const SET_TITLE = 'SET_TITLE';

export default function update (state = {}, action) {
  if (action.type === SET_TITLE) {
    return {title: action.title};
  }
  return state;
}
