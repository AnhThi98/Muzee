import axios from 'axios';
import { FETCH_SONG_SUCCESS } from '../constant/action_constant';

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

export function fetchSuggestedSong(id) {
  return axios.get(`/api/media/suggested-song/${id}`);
}