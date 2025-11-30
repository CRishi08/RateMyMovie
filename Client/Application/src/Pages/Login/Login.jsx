import React, { useContext, useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../services/user'
import { toast } from 'react-toastify'
import { AuthContext } from '../../App'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { setUser } =useContext(AuthContext)
  const onLogin = async () => {
    const response = await login(email, password)
    if (response['status'] == 'success') {
     
      toast.success('Login Successfull')
      localStorage.setItem('token', response['data']['token'])
      localStorage.setItem('first_name', response['data']['first_name'])
      localStorage.setItem('user_id', response['data']['user_id'])
      setUser({
        first_name:response.data.first_name,
        user_id:response.data.first_name,
      })
      navigate('/allMovies')
    }
    else {
      toast.error("login failed")
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="page-header">Sign in</h1>
        <div className="login-container">
          <div className="mb-3">
            <label htmlFor="">Email Address</label>
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="">Password</label>
            <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" />
          </div>
          Don't have an Account? <Link to='/register'>Sign up </Link>
          <div className="button">
            <button onClick={onLogin} className=" button btn-success">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
