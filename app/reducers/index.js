import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import playerReducer from './player_reducer';
import songReducer from './song_reducer';
import seekBarReducer from './seekbar_reducer';


export default combineReducers({
  playerState: playerReducer,
  songData: songReducer,
  seekBarState: seekBarReducer,
  routing: routerReducer,
});