import React, { useState } from "react";
import axios from "axios";
import FormBody from "../components/FormBody";
import FormWrapper from "../components/FormWrapper";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import FormInputBox from "../components/FormInputBox";
import FormButton from "../components/FormButton";
import FormFooter from "../components/FormFooter";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authAtom from "../store/atom/authAtom";

const SignUp = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const setAuthAtom=useSetRecoilState(authAtom);
    const navigate=useNavigate();

  return (
      <FormBody>
         <FormWrapper>
               <Heading title={"Sign Up"}></Heading>
               <SubHeading subHeading={"Enter your credentials to create new account"}></SubHeading>
               <FormInputBox label={"FirstName"} type={"text"} placeholder={"Enter FirstName"} onChange={(e)=>setFirstName(e.target.value)}></FormInputBox>                    
               <FormInputBox label={"LastName"} type={"text"} placeholder={"Enter LastName"} onChange={(e)=>setLastName(e.target.value)}></FormInputBox>
               <FormInputBox label={"UserName"} type={"text"} placeholder={"Enter Username"} onChange={(e)=>setUserName(e.target.value)} ></FormInputBox>
               <FormInputBox label={"Password"} type={"password"} placeholder={"Enter Password"} onChange={(e)=>setPassword(e.target.value)} ></FormInputBox>
               <FormButton text={"Sign Up!"} onClick={async ()=>{
                try {
                     const res= await axios.post(`http://localhost:8080/api/v1/users/signup`,{
                              username,
                              password,
                              firstName,
                              lastName
                     });
                     const {message,token,balance}=res.data;
                     localStorage.setItem('token', token);
                     localStorage.setItem('balance', balance.toString());
                     localStorage.setItem('username', username);
                     localStorage.setItem('firstName', res.data.firstName);
                     localStorage.setItem('lastName', res.data.lastName);
                     setAuthAtom({isLoggedIn:true,token,balance,username,firstName,lastName});
                     alert(message);
                     navigate(`/dashboard`);
                } catch (error) {
                     console.log("Error in handleSubmit",error.response.data.message)
                     alert(error.response.data.message);
                     setUserName("")
                     setFirstName("")
                     setLastName("")
                     setPassword("")
                }}}></FormButton>
               <FormFooter label={"Sign In"} title={"Already Have An Account ? "} to={"/signin"}></FormFooter>
         </FormWrapper>
      </FormBody>
  );
};

export default SignUp;
