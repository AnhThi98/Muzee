import { FETCH_SONG_SUCCESS, FETCH_SUGGESTED_SONG_SUCCESS } from '../constant/action_constant';

const initialState = {
  data: {},
  suggestedSongs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FETCH_SONG_SUCCESS:
    return { ...state, data: action.data };
  case FETCH_SUGGESTED_SONG_SUCCESS:
    return { ...state, suggestedSongs: action.songs };
  default:
    return state;
  }
}