import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

moment.locale()
export default function Header () {
    return (
        <div>
            <div>
                <span>{moment().format('llll')}</span>
                <h3><Link to='/'>Home</Link></h3>
                <h3>Logout</h3>
            </div>
            <div><h1>Data Diri</h1></div>
        </div>
    )
}