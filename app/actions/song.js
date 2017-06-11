import axios from 'axios';
import { FETCH_SONG_SUCCESS, FETCH_SUGGESTED_SONG_SUCCESS } from '../constant/action_constant';

export function fetchSong(name, id) {
  return dispatch => {
    axios.get(`/api/media/song?name=${name}&id=${id}`)
    .then(({ data }) => dispatch({
      type: FETCH_SONG_SUCCESS,
      data,
    }))
    .catch(err => console.log(err));
  };
}

export function fetchSuggestedSongs(id) {
  return dispatch => {
    axios.get(`/api/media/suggested-song/${id}`)
      .then(({ data }) => dispatch({
        type: FETCH_SUGGESTED_SONG_SUCCESS,
        songs: data.songs,
      }))
      .catch(err => console.log(err));
  };
}