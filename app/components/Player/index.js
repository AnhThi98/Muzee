import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import rewindIcon from '../../svg/ios-rewind.svg';
import fastForwardIcon from '../../svg/ios-fastforward.svg';
import pauseIcon from '../../svg/ios-pause.svg';
import initAnalyzer from '../../utils/initAnalyzer';
import './index.sass';

const propTypes = {
  playerState: PropTypes.object.isRequired,
  updateLyric: PropTypes.func.isRequired,
  updateLyricPercent: PropTypes.func.isRequired,
  songData: PropTypes.object.isRequired,
  updateSongDuration: PropTypes.func.isRequired,
  updateSongCurrentTime: PropTypes.func.isRequired,
  fullFillSeekBar: PropTypes.func.isRequired,
  unFullFillSeekBar: PropTypes.func.isRequired,
  fetchSuggestedSongs: PropTypes.func.isRequired,
  fetchsong: PropTypes.func.isRequired,
};


const routeRegex = /\/song\/([A-Za-z0-9_-]+)\/(\w{8})/g;

const fetchSongIfPossible = function (match, componentInstance) {
  const _this = componentInstance;
  if (match) {
    const [, name, id] = match;
    if (id !== _this.state.id) {
      _this.props.fetchSong(name, id);
      _this.props.fetchSuggestedSongs(id);
      _this.setState({ id, progress: 0 }); // reset the player progress
    }
  }
};

class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      progress: 0,
      isSeeking: false,
      isInit: false,
      id: undefined,
    };
  }

  componentDidMount() {
    this.audio = this.refs.audio;
    this.audio.onplay = () => {
      this.props.unFullFillSeekBar();
      this.props.updateSongDuration(this.audio.duration);
      this.timer = setInterval(() => this.updateProgress(this.audio), 50);
    };
    this.audio.onpause = () => clearInterval(this.timer);

    // fetchsong on entering directly to the song address
    const match = routeRegex.exec(window.location.pathname);
    fetchSongIfPossible(match, this);

    // initialize the audio analyzer
    initAnalyzer(this.audio);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    // update the seekbar
    const nextPercent = nextProps.playerState.playedPercent;
    const currentPercent = this.props.playerState.playedPercent;
    if (nextPercent != currentPercent  && nextPercent != undefined) {
      this.audio.currentTime = this.audio.duration * nextPercent / 100;
    }

    // fetchsong when receive new route props
    const loc = nextProps.routing.locationBeforeTransitions;
    const match = loc && routeRegex.exec(loc.pathname);
    fetchSongIfPossible(match, this);
  }

  updateProgress(audio) {
    const lyric = this.props.songData.lyric;
    const { updateSongCurrentTime } = this.props;

    // update progress bar
    let val = 0;
    if (audio.currentTime > 0) {
      val = (audio.currentTime / audio.duration * 100).toFixed(2);
    }
    if (!this.state.isSeeking) {
      this.setState({ progress: val });
    }

    updateSongCurrentTime(this.audio.currentTime);

    if (!lyric.length) return;

    const {
      playerState: { lyric1, lyric2 },
      updateLyricPercent,
      updateLyric,
    } = this.props;


    if (audio.currentTime > lyric[lyric.length - 1].end || audio.currentTime) {

      // clear lyric when the audio is playing with beat only
      updateLyric([], []);
    }

    for (let i = 0; i < lyric.length; i++) {
      if (i < lyric.length - 1 &&
        i % 2 == 0 &&
        audio.currentTime >= lyric[i].start &&
        audio.currentTime <= lyric[i + 1].end) {
        updateLyric(lyric[i], lyric[i + 1]);
      }
    }

    if (audio.currentTime <= lyric1.end) {
      let width = (audio.currentTime - lyric1.start) / (lyric1.end - lyric1.start) * 100;
      width = Math.ceil(width);
      updateLyricPercent(width, 0);
    } else if (audio.currentTime <= lyric2.end) {
      updateLyricPercent(null, 0);
      let width = (audio.currentTime - lyric2.start) / (lyric2.end - lyric2.start) * 100;
      width = Math.ceil(width);
      width = width <=  0 ? 0 : (width > 96 ? 100 : width); // fill the karaoke text
      updateLyricPercent(100, width);
    }
  }

  handleChange(value) {
    this.setState({ progress: value, isSeeking: true });
  }

  handleChangeComplete(value) {
    if (value == 100) {
      this.props.fullFillSeekBar();
      this.props.updateLyric([], []);
    }

    this.audio.play();
    this.audio.currentTime = (value / 100) * this.audio.duration;
    this.setState({ isSeeking: false });
  }

  render() {
    const { songData } = this.props;

    return (
      <div className='player'>
        <audio
          autoPlay
          src={songData.source_list && songData.source_list[0]}
          crossOrigin='anonymous'
          ref='audio'
        />
        <div className="player-info">
          <span className='ellipsis' title='Whatya want from me yeah really cool'>Whatya want from me yeah really cool </span>
          <a href='#' className='ellipsis' title='title'>Adam lambert</a>
        </div>
        <div className="player-btns">
          <img src={rewindIcon} className="player-btn"/>
          <img src={pauseIcon} className="player-btn" />
          <img src={fastForwardIcon} className="player-btn"/>
        </div>
        <div className="player-seek">
          <InputRange
            maxValue={100}
            minValue={0}
            value={parseInt(this.state.progress)}
            onChange={this.handleChange.bind(this)}
            onChangeComplete={this.handleChangeComplete.bind(this)}
          />
        </div>
      </div>
    );
  }
}

Player.propTypes = propTypes;

export default Player;