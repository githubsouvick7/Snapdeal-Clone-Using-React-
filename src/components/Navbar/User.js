import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import './User.css'

const User = () => {
    const { user } = useAuth0();
    return (
        <div className='box'>
            <div className="image">
                <img src={user.picture} />
            </div>
            <div className="item">
                <h5>Name: {user.name}</h5>
            </div>
            <div className="item">
                <h5>Email: {user.email}</h5>
            </div>
        </div>
    )
}

export default User