import React from 'react';
import { connect } from 'react-redux';
import { Player } from '../components';
import { updateLyric, updateLyricPercent } from '../actions/player';
import { updateSongCurrentTime,
  updateSongDuration,
  fullFillSeekBar,
  unFullFillSeekBar,
} from '../actions/seekbar';

function PlayerContainer(props) {
  return (
    <Player {...props}/>
  );
}

function mapStateToProps({ playerState, songData }) {
  return { playerState, songData };
}

export default connect(mapStateToProps,
  { updateLyric,
    updateLyricPercent,
    updateSongCurrentTime,
    updateSongDuration,
    fullFillSeekBar,
    unFullFillSeekBar,
  })(PlayerContainer);

