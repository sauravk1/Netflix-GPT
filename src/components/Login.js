import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
    const [signInForm, setSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setSignInForm(!signInForm);
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className='' src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg" 
            alt="logo" />
        </div>
        <form className='w-3/12 my-36 mx-auto right-0 left-0 absolute p-12 bg-black text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl p-4'> {signInForm ? 'Sign In' : 'Sign Up'}</h1>
            {!signInForm && (
            <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-800'/>
            )}
            <input type='text' placeholder='Email or phone number' className='p-4 my-4 w-full bg-gray-800'/>
            <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-800'/>
            <button type='submit' className='p-4 my-6 bg-red-700 w-full rounded-lg'>{signInForm ? 'Sign In' : 'Sign Up'}</button>
            <p className='p-4 cursor-pointer' onClick={toggleSignInForm}>{ signInForm ? 'New to Netflix? Sign Up Now' : 'Already registered? Sign in Now'}</p>
        </form>
    </div>
  )
}

export default Login;