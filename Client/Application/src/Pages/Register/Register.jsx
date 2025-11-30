import React from 'react'
import './register.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { register } from '../../../services/user'
import { Link, useNavigate } from 'react-router-dom'
function Register() {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [birthday, SetBirthDate] = useState('')
    const [mobile, setMobile] = useState('')

    const navigate = useNavigate()
    const onRegister = async () => {
        if (first_name.length == 0) {
            toast.warning('please enter first name')
        } else if (last_name.length == 0) {
            toast.warning('please enter last name')
        } else if (email.length == 0) {
            toast.warning('please enter email')
        } else if (mobile.length == 0) {
            toast.warning('please enter phone number')
        } else if (password.length == 0) {
            toast.warning('please enter password')
        } else if (confirmPassword.length == 0) {
            toast.warning('please confirm password')
        } else if (password != confirmPassword) {
            toast.warning('password does not match')
        }
        else if(birthday.length == 0){
            toast.warning("Birthdate can't be Empty")
        }
        else {

            const response = await register(first_name, last_name, email, password, birthday, mobile)
            console.log(response)
            if (response.status === 'success') {
                
                toast.success("Register Succesfull")
                navigate('/')
            }
            else {
                toast.error('fail')
                toast.error(response.error)
            }

        }
    }
    return (
        <div>
            <div>
                <div className="container">
                    <h1 className="page-header">Sign Up</h1>
                    <div className="Register-container">

                        <div className="mb-3">
                            <label htmlFor="">First Name</label>
                            <input onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Last Name</label>
                            <input onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Confirm Password</label>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Birthdate</label>
                            <input onChange={(e) => SetBirthDate(e.target.value)} type="date" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Mobile</label>
                            <input onChange={(e) => setMobile(e.target.value)} type="tel" className="form-control" />
                        </div>
                    </div>
                    <div>
                        Already have an account? <Link to='/'>Login here</Link>
                    </div>
                    <button onClick={onRegister} className="btn btn-success">
                        Register
                    </button>

                </div>
            </div>
        </div>
    )
}


export default Register
