import React from 'react'
import BackButton from './BackButton';
import { Outlet, Link } from 'react-router-dom'
/*img*/
import logo from '../assets/Logo.svg'

function IDLayout() {
  return (
    <div>
        <BackButton />

        <Link to='/'>
            <h1>
                <img src={logo} alt='logo'/>
                응급실
            </h1>
        </Link>

        <Outlet />
    </div>
  )
}

export default IDLayout