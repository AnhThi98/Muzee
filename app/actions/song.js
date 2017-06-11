import axios from 'axios';
import { FETCH_SONG_SUCCESS } from '../constant/action_constant';

export function fetchSong() {
  return dispatch => {
    axios.get('/api/media/song?name=What-Do-You-Meanr&id=ZW7W9DZU')
    .then(({ data }) => dispatch({
      type: FETCH_SONG_SUCCESS,
      data,
    }))
    .catch(err => console.log(err));
  };
}