import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../components/FormWrapper';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import FormInputBox from '../components/FormInputBox';
import FormButton from '../components/FormButton';
import FormFooter from '../components/FormFooter';
import FormBody from '../components/FormBody';
import { useSetRecoilState } from 'recoil';
import authAtom from '../store/atom/authAtom';
import axios from 'axios';

const SignIn = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const setAuthAtom=useSetRecoilState(authAtom);
    const navigate=useNavigate();
  return (
      <FormBody>
         <FormWrapper>
               <Heading title={"Sign In"}></Heading>
               <SubHeading subHeading={"Enter your credentials to Sign In"}></SubHeading>
               <FormInputBox label={"UserName"} type={"text"} placeholder={"Enter Username"} onChange={(e)=>setUserName(e.target.value)} ></FormInputBox>
               <FormInputBox label={"Password"} type={"password"} placeholder={"Enter Password"} onChange={(e)=>setPassword(e.target.value)}  ></FormInputBox>
               <FormButton text={"Sign In!"} onClick={async ()=>{
                try {
                     const res= await axios.post(`http://localhost:8080/api/v1/users/signin`,{
                              username,
                              password
                     });
                     const {message,token,balance}=res.data;
      
                     setAuthAtom({isLoggedIn:true,token,balance,username,firstName:res.data.firstName,lastName:res.data.lastName});
                     alert(message);
                     navigate(`/dashboard`);
                } catch (error) {
                     console.log("Error in handleSubmit",error.response.data.message)
                     alert(error.response.data.message);
                     setUserName("")
                     setPassword("")
                }}} ></FormButton>
               <FormFooter label={"Sign Up"} title={"Don't Have An Account ? "} to={"/signup"}></FormFooter>
         </FormWrapper>
      </FormBody>
  )
}

export default SignIn;