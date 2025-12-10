import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import User from "../components/User";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "../store/atom/authAtom";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users,setUsers]=useState([]);
  const [filter,setFilter]=useState("");
  const {token} =useRecoilValue(authAtom);
  const fetchUsers=async()=>{
    try {
        const res=await axios.get(`http://localhost:8080/api/v1/users/bulk?filter=${filter}`,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
        });
        console.log(res.data);
        setUsers(res.data.users)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
        fetchUsers();
  },[filter])
  return (
    <>
      <h2 className="text-lg font-bold">Users</h2>
      <input
        type="text"
        placeholder="Search Users..."
        className="p-1 px-2 lg:p-3 border-[0.5px] border-gray-400 outline-none  rounded-xl text-gray-600 w-full"
        onChange={(e)=> setFilter(e.target.value)}
      />
      <div>
        {users.map((user) =>  <User key={user._id} user={user}></User>)}
      </div>
    </>
  );
};

export default Users;
