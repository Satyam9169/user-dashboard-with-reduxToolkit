import React, { useState } from 'react'
import './Register.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase/Firebase'
import { setDoc, doc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'

const Registration = ({ setJustRegistered }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    countryCode: '+1',
    mobile: '',
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prevState => ({ ...prevState, [id]: value }))
  }

  const validate = () => {
    let errors = {}
    if (!formData.firstName) errors.firstName = 'First Name is required'
    if (!formData.lastName) errors.lastName = 'Last Name is required'
    if (!formData.email) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid'
    if (!formData.address) errors.address = 'Address is required'
    if (!formData.country) errors.country = 'Country is required'
    if (!formData.state) errors.state = 'State is required'
    if (!formData.city) errors.city = 'City is required'
    if (!formData.pincode) errors.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(formData.pincode)) errors.pincode = 'Pincode is invalid'
    if (!formData.mobile) errors.mobile = 'Mobile number is required'
    if (!formData.password) errors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match'
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const { email, password } = formData; // Destructure email and password from formData
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, 'users', user.uid), {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
            countryCode: formData.countryCode,
            mobile: formData.mobile,
            userId: user.uid
          });
          console.log('User Registered Successfully !!');
          alert('User Registered Successfully !!');
        } else {
          console.log('No user found after registration');
        }

        // Reset form fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          country: '',
          state: '',
          city: '',
          pincode: '',
          countryCode: '+1',
          mobile: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
        // Navigate to login page
        // window.location.href="/login"
        setJustRegistered(true);
        navigate('/login');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <>
      <section className='registration-container'>
        <form className='registration-form' onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} />
              {errors.address && <div className="error">{errors.address}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text" className="form-control" id="country" value={formData.country} onChange={handleChange} />
              {errors.country && <div className="error">{errors.country}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">State</label>
              <input type="text" className="form-control" id="state" value={formData.state} onChange={handleChange} />
              {errors.state && <div className="error">{errors.state}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" value={formData.city} onChange={handleChange} />
              {errors.city && <div className="error">{errors.city}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="pincode" className="form-label">Pincode</label>
              <input type="text" className="form-control" id="pincode" value={formData.pincode} onChange={handleChange} />
              {errors.pincode && <div className="error">{errors.pincode}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <div className="input-group">
                <select className="form-select" id="countryCode" value={formData.countryCode} onChange={handleChange}>
                  <option value="+1">+1</option>
                  <option value="+91">+91</option>
                  <option value="+44">+44</option>
                  {/* Add more country codes as needed */}
                </select>
                <input type="text" className="form-control" id="mobile" value={formData.mobile} onChange={handleChange} />
              </div>
              {errors.mobile && <div className="error">{errors.mobile}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>
          </div><br />
          <button type="submit" className="btn btn-primary">Submit</button>
          <div className="mb-3">
            <Link to={'/login'}>Already Have an account</Link>
          </div>
        </form>
      </section>
    </>
  )
}

export default Registration
