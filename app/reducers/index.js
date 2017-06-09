import { combineReducers } from 'redux';
import lyricReducer from './lyric_reducer';
import songReducer from './song_reducer';

export default combineReducers({
  lyric: lyricReducer,
  songData: songReducer,
});