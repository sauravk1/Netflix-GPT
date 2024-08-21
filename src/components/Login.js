import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidateData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);
    const toggleSignInForm = () => {
        setSignInForm(!signInForm);
    }
    const handleButtonClick = () => {
        // validate the form data 
        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return;
        //signUp/signIn
        if(!signInForm) {
            //Sign Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: fullName.current.value, 
                    photoURL: "https://avatars.githubusercontent.com/u/22241289?v=4&size=64"
                }).then(() => {
                    // profile updated
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(
                        addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        })
                    )
                    navigate('/browse');
                }).catch((error) => {
                    //error 
                    setErrorMessage(error.message);
                });
                console.log(user)
                navigate('/browse');
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;
                setErrorMessage(errorCode + "-"+errorMessage);
            })
        } else {
            //sign In
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/browse');
                console.log(user)
            }).catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + "-"+errorMessage)
                setErrorMessage(errorCode + "-"+errorMessage);
            })
        }
       
    }
  return (
    <div>
        <Header />
        <div className='absolute'>
            <img className='' src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg" 
            alt="logo" />
        </div>
        <form onSubmit={(e) =>e.preventDefault()} className='w-3/12 my-36 mx-auto right-0 left-0 absolute p-12 bg-black text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl p-4'> {signInForm ? 'Sign In' : 'Sign Up'}</h1>
            {!signInForm && (
            <input type='text' ref={fullName}  placeholder='Full Name' className='p-4 my-4 w-full bg-gray-800'/>
            )}
            <input type='text' ref={email} placeholder='Email or phone number' className='p-4 my-4 w-full bg-gray-800'/>
            <input type='password' ref={password} placeholder='Password' className='p-4 my-4 w-full bg-gray-800'/>
            <p className='text-red-500'>{errorMessage}</p>
            <button type='submit' className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{signInForm ? 'Sign In' : 'Sign Up'}</button>
            <p className='p-4 cursor-pointer' onClick={toggleSignInForm}>{ signInForm ? 'New to Netflix? Sign Up Now' : 'Already registered? Sign in Now'}</p>
        </form>
    </div>
  )
}

export default Login;