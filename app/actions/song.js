import axios from 'axios';

export function fetchSong() {
  let songData;
  axios.get('/api/media/song?name=Bailando&id=ZW6B09WZ')
  .then(({ data }) => console.log(data));
  return {};
}