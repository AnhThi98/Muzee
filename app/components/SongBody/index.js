import React from 'react';
import addCircle from '../../svg/android-add-circle.svg';
import './index.sass';

class SongBody extends React.Component {
  render() {
    return (
      <div className="song-body">
        <div className="comment-section">
          <div className="comment-section-heading">
            <div>
              <h3>Bình luận <span>(23)</span></h3>
            </div>
            <div>
              <img src={addCircle} />
              <span>Thêm bình luận</span>
            </div>
          </div>
          <div className="comment-body">
            <div className="comment">
              <div className="comment-wrapper">
                <div className="comment-image">
                  <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                </div>
                <div className="comment-content have-sub">
                  <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="comment-date">13 March</div>
                </div>
              </div>
              <div className="sub-cm-wrapper">
                <div className="comment sub-comment">
                  <div className="comment-image">
                    <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                  </div>
                  <div className="comment-content">
                    <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="comment-date">13 March</div>
                  </div>
                </div>
                <div className="comment sub-comment">
                  <div className="comment-image">
                    <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                  </div>
                  <div className="comment-content">
                    <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="comment-date">13 March</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="comment-wrapper">
                <div className="comment-image">
                  <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                </div>
                <div className="comment-content">
                  <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="comment-date">13 March</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="suggested-section">
          <div className="suggested-section-heading">
            <h3>Gợi ý</h3>
          </div>
          <div className="suggested-section-body">
            <div className="suggested-song">
              <img src="http://zmp3-photo-td.zadn.vn/thumb/94_94/covers/f/3/f3ccdd27d2000e3f9255a7e3e2c48800_1493277779.jpg" alt=""/>
              <div className="suggested-song-info">
                <a href="#" className='suggested-song-name'>Não Cá Vàng</a>
                <a href="#" className='suggested-song-artist'>OnlyC, </a>
                <a href="#" className='suggested-song-artist' style={{marginLeft: '2px'}}>Lou Hoàng</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongBody;