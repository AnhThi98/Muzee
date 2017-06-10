import { UPDATE_LYRIC,
  UPDATE_LYRIC_PERCENT,
  UPDATE_PLAYED_PERCENT } from '../constant/action_constant';

const initialState = {
  playedPercent: undefined,
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
  case UPDATE_PLAYED_PERCENT:
    return { ...state, playedPercent: action.playedPercent };
  default:
    return state;
  }
}