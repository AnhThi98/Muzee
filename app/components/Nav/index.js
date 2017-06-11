import React from 'react';
import { Link } from 'react-router';
import './nav.sass';


function Nav() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="https://a-v2.sndcdn.com/assets/images/header/wordmark-d95b0ac.png" alt=""/>
        </Link>
      </div>
      <div className="searchBar">
        <div className="search-wrapper">
          <input type="text" placeholder="search for songs"/>
        </div>
      </div>
      <div className="navRight">
        <ul className="nav-menu">
          <a href="#">
            <li>BXH</li>
          </a>
          <a href="#">
            <li>Albums</li>
          </a>
          <a href="#">
            <li>Nghệ sĩ</li>
          </a>
          <a href="#">
            <li>Top 100</li>
          </a>
        </ul>

        <div className="auth">
          <a href="#" className='sInLink'>Đăng nhập</a>
          <a href="#" className='sUpLink'>Đăng kí</a>
        </div>

        <div className="more">

        </div>
      </div>
    </nav>
  );
}

export default Nav;