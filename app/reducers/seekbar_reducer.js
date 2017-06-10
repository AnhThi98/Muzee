import { UPDATE_SONG_DURATION,
  UPDATE_SONG_CURRENT_TIME,
  FULLFILL_SEEKBAR,
  UNFULLFILL_SEEKBAR,
} from '../constant/action_constant';

const initialState = {
  songDuration: undefined,
  songCurrentTime: undefined,
  isFullFilled: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case UPDATE_SONG_DURATION:
    return { ...state, songDuration: action.songDuration };
  case UPDATE_SONG_CURRENT_TIME:
    return { ...state, songCurrentTime: action.songCurrentTime };
  case FULLFILL_SEEKBAR:
    return { ...state, isFullFilled: true };
  case UNFULLFILL_SEEKBAR:
    return { ...state, isFullFilled: false };
  default:
    return state;
  }
}