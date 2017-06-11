import { FETCH_SONG_SUCCESS } from '../constant/action_constant';
const initialState = { };

export default function (state = initialState, action) {
  if (action.type == FETCH_SONG_SUCCESS) {
    return action.data;
  }
  return state;
}