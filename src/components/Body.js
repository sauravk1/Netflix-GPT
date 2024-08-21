import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {path: '/', element: <Login />},
        {path: '/browse', element: <Browse />},
    ]);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          // signed In
          const {uid, email, displayName, photoURL} = user;
          //dispatch to store
          dispatch(addUser({uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
          

        } else {
          // signed out
          dispatch(removeUser());

        }
      });
    },[])
  return (
    <div>
       <RouterProvider router={appRouter}>
       <Login />
       <Browse />
       </RouterProvider>
    </div>
  )
}

export default Body