import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate = useNavigate()
    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('first_name')
        localStorage.removeItem('title')
        localStorage.removeItem('selectedmovie_id')


        navigate('/')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">

                    <Link className="navbar-brand" to='/movieReviews'>Movie Reviews</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="navbar-brand" to='/allMovies'>All Movies</Link>
                            <Link className="navbar-brand" to='/myReviews'>My Reviews</Link>
                            <Link className="navbar-brand" to='/editReview'>Edit Review</Link>
                            <Link className="navbar-brand" to='/allReviews'>All Reviews</Link>
                        </div>
                        <div className="navbar-nav">
                            <Link className="navbar-brand" to='/editProfile'>Edit Profile</Link>
                            <Link className="navbar-brand" to='/changePassword'>Change Password</Link>
                            <div className="navbar-item">  <button onClick={onLogout} >Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar
