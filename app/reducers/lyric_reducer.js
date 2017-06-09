import { UPDATE_LYRIC, UPDATE_LYRIC_PERCENT } from '../constant/action_constant';

const initialState = {
  lyric1: '',
  lyric2: '',
  per1: 0,
  per2: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case UPDATE_LYRIC:
    return action.lyrics;
  case UPDATE_LYRIC_PERCENT:
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
}