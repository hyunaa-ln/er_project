import React from 'react'
import { NavLink } from 'react-router-dom';
/*img*/
import homeIcon from '../assets/home-sharp.svg'
import solutionIcon from '../assets/chatbubbles-sharp.svg'
import communityIcon from '../assets/people-sharp.svg'
import mypageIcon from '../assets/person-sharp.svg'


function Navigation() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            <img src={homeIcon} alt='Home' />
            <p>홈</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/solution" activeClassName="active">
            <img src={solutionIcon} alt='Solution' />
            <p>연애솔루션</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" activeClassName="active">
            <img src={communityIcon} alt='Community' />
            <p>커뮤니티</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            <img src={mypageIcon} alt='Mypage' />
            <p>마이페이지</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation