import React, { useEffect, useState } from 'react'
import './SignModal.css'

function SignModal({ setModal, setToken }) {

  const [userLoginName, setUserLoginName] = useState()
  const [userLoginPassword, setUserLoginPassword] = useState()

  const [isSingUp, setISignUp] = useState(true)

  function getToken(params) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": userLoginName,
      "password": userLoginPassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://ecommerce0003.pythonanywhere.com/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access) {
          setToken(result.access)
          setModal(false)
          setUserLoginName("")
          setUserLoginPassword("")
          localStorage.setItem("token", result.access)
        } else {
          alert("Ma'lumot yo'q!")
        }
      })
      .catch((error) => console.error(error));
  }


  return (
    <div className='modal'>
      <p onClick={() => {
        setModal(false)
      }}>x</p>
      {isSingUp ?
        <form action="" className="form login">
          <label htmlFor="">Username:</label>
          <input value={userLoginName} onChange={(e) => {
            setUserLoginName(e.target.value)
          }} type="text" />
          <label htmlFor=""> Password:</label>
          <input value={userLoginPassword} onChange={(e) => {
            setUserLoginPassword(e.target.value)
          }} type="text" />

          <button type='button' onClick={() => {
            getToken()
          }}>Login</button>

          <h3 onClick={() => {
            setISignUp(false)
          }} >Sing Up</h3>
        </form>
        : <form className='form'>
          <div className="form-div">
            <div>
              <label htmlFor="">Username:</label>
              <input type="text" placeholder='username' />
              <label htmlFor="">Password:</label>
              <input type="text" placeholder='password' />
              <label htmlFor="">Email:</label>
              <input type="text" placeholder='email' />
              <label htmlFor="">First name:</label>
              <input type="text" placeholder='first name' />

            </div>
            <div>
              <label htmlFor="">Last name:</label>
              <input type="text" placeholder='last name' />
              <label htmlFor="">Phone number:</label>
              <input type="text" placeholder='phone number' />
              <label htmlFor="">City:</label>
              <input type="text" placeholder='city' />
              <label htmlFor="">Address:</label>
              <input type="text" placeholder='address' />

            </div>
          </div>

          <button >Sign up</button>
          <h3 onClick={() => {
            setISignUp(true)
          }} >Login</h3>
        </form>}

    </div>
  )
}

export default SignModal