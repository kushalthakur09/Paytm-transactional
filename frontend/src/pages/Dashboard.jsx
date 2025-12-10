import React, { useEffect, useState } from 'react'
import AppBar from '../components/AppBar'
import Balance from '../components/Balance'
import Users from './Users'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import authAtom from '../store/atom/authAtom'

const Dashboard = () => {
  const navigate = useNavigate();
  const {isLoggedIn,token,firstName,balance}=useRecoilValue(authAtom);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    }
  }, []);


  return (
    <div className='min-h-screen max-w-screen bg-slate-200 p-10 xl:px-20 2xl:px-30'>
        <AppBar username={firstName}></AppBar>
        <div className='px-4'>
            <Balance balance={balance}></Balance>
        </div>
        <div className='px-4'>
            <Users></Users>
        </div>
    </div>
  )
}

export default Dashboard