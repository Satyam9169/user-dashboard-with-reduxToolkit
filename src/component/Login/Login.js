import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { auth } from '../Firebase/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prevState => ({ ...prevState, [id]: value }))
  }

  const validate = () => {
    let errors = {}
    if (!formData.email) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid'
    if (!formData.password) errors.password = 'Password is required'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      const { email, password } = formData;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('User Logged-In Successfully !!')
        setFormData({
          email: '',
          password: '',
        });
        // window.location.href = "/profile";
      } catch (error) {
        console.log(error.message)
      }
      console.log('Form data:', formData)
    } else {
      setErrors(validationErrors)
    }
  }

  return (
    <section className='login-container'>
      <div className='login-form'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
              value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="password"
              value={formData.password} onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <Link to={'/resetpass'}>Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <div className="mb-3">
            <Link to={'/register'}>Don't Have account yet</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login
