import React, { useState } from 'react'
import FormBody from '../components/FormBody'
import FormWrapper from '../components/FormWrapper'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import FormFooter from '../components/FormFooter'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import authAtom from '../store/atom/authAtom'

const SendMoney = () => {
      const [searchParams] = useSearchParams();
      const [amount,setAmount] =useState(0);
      const [auth,setAuth] = useRecoilState(authAtom);
      const id = searchParams.get('id'); 
      const username = searchParams.get('username');
      const navigate=useNavigate();
  return (
    <FormBody>
        <FormWrapper>
           <Heading title={"Send Money"} ></Heading>
           <SubHeading subHeading={"Pay Your Money Securely"}></SubHeading>
           <div className='flex justify-center sm:justify-center items-center w-full flex-wrap sm:flex-nowrap'>
                <span className='rounded-full  md:text-lg font-medium py-1 px-3 sm:py-2 sm:px-4 md:py-3 md:px-5 bg-green-400  text-white flex justify-center items-center h-full'>{username[0].toUpperCase()}</span>
                <div className='px-1 text-sm md:px-2 md:text-lg  flex justify-center sm:justify-start items-center w-full'>{username}</div>
           </div>
            <p className='w-full text-xs sm:text-base text-center sm:text-left'>Amount (in Rs.)</p>
           <div className='w-full'>
              <input type="text" onChange={(e)=>setAmount(e.target.value)} placeholder='Enter Amount' className="w-full py-1 sm:py-2 outline-none rounded-xl text-gray-600" />
           </div>
           <div className='w-full'>
              <button type="button" onClick={async ()=>{
               const res=await axios.post("http://localhost:8080/api/v1/account/transfer",{
                  amount:parseFloat(amount),
                  to:id
               },{
                  headers:{
                   'Authorization': `Bearer ${auth.token}`
                  }
               });

               if (res.status === 200) {
                        setAuth(prevAuth => ({
                        ...prevAuth,
                        balance: prevAuth.balance - parseFloat(amount) 
                  }));
                  alert("Amount transfered successfully!!");
                  setTimeout(() => navigate('/dashboard'), 1500);
               }
              }} className="w-full text-white bg-green-500 box-border border border-transparent hover:bg-green-300 focus:ring-4 focus:ring-green-300 shadow-xs font-medium leading-5 rounded-xl text-sm  py-1 focus:outline-none">SEND</button>
           </div>
           <FormFooter to={"/dashboard"} label={"Go To Dashboard"}></FormFooter>
        </FormWrapper>
    </FormBody>
  )
}

export default SendMoney