import React from 'react';
import KaraokeLyric from 'react-karaoke-lyric';
import PropTypes from 'prop-types';
import SeekBar from './seekbar';
import './index.sass';

const propTypes = {
  playerState: PropTypes.object.isRequired,
  seekBarState: PropTypes.object.isRequired,
  updatePlayedPercent: PropTypes.func.isRequired,
  cover: PropTypes.string.isRequired,
};

function SongHeader(props) {
  const { per1, per2, lyric1, lyric2 } = props.playerState;

  return (
    <div className='songHeader' style={{ background: `url(${props.cover})` }}>
      <div />
      { props.showInfo
        ? <div className="songHeader-info">
          <h2>{props.name}</h2>
          <h3>{props.artist}</h3>
        </div>
        : null
      }
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

SongHeader.propTypes = propTypes;

export default SongHeader;