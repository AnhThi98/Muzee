import React from 'react';
import KaraokeLyric from 'react-karaoke-lyric';
import { connect } from 'react-redux';
import SeekBar from './seekbar';
import { updatePlayedPercent } from '../../actions/player';
import './index.sass';


function SongHeader(props) {
  const { per1, per2, lyric1, lyric2 } = props.playerState;

  return (
    <div className='songHeader'>
      <div />
      <div className='karaokeWrapper'>
        <KaraokeLyric
          text={lyric1.text || ''}
          percentage={per1 || 0}
          activeStyle={{ color: 'skyblue' }}
        />
        <br />
        <br />
        <KaraokeLyric
          text={lyric2.text || ''}
          percentage={per2 || 0}
          activeStyle={{ color: 'skyblue' }}
        />
      </div>
      <SeekBar
        seekBarState={props.seekBarState}
        updatePlayedPercent={props.updatePlayedPercent}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { playerState, seekBarState } = state;
  return { playerState, seekBarState };
}

export default connect(mapStateToProps, { updatePlayedPercent })(SongHeader);