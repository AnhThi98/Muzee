import { UPDATE_LYRIC,
  UPDATE_LYRIC_PERCENT,
  UPDATE_PLAYED_PERCENT,
 } from '../constant/action_constant';

export function updateLyric(lyric1, lyric2) {
  return {
    type: UPDATE_LYRIC,
    lyrics: { lyric1, lyric2 },
  };
}

export function updatePlayedPercent(percent) {
  return {
    type: UPDATE_PLAYED_PERCENT,
    playedPercent: percent,
  };
}

export function updateLyricPercent(...percentages) {
  const payload = {};
  percentages.forEach((value, index) => {
    if (value !== null) {
      payload[`per${index + 1}`] = value;
    }
  });
  return {
    type: UPDATE_LYRIC_PERCENT,
    payload,
  };
}
