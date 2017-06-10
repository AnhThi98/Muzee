import { UPDATE_SONG_DURATION,
  UPDATE_SONG_CURRENT_TIME,
  FULLFILL_SEEKBAR,
  UNFULLFILL_SEEKBAR,
} from '../constant/action_constant';

export function updateSongDuration(duration) {
  return {
    type: UPDATE_SONG_DURATION,
    songDuration: duration,
  };
}

export function fullFillSeekBar() {
  return {
    type: FULLFILL_SEEKBAR,
  };
}

export function unFullFillSeekBar() {
  return {
    type: UNFULLFILL_SEEKBAR,
  };
}

export function updateSongCurrentTime(time) {
  return {
    type: UPDATE_SONG_CURRENT_TIME,
    songCurrentTime: time,
  };
}