import { Button } from "@/components/ui/button";
import { AppContent } from "@/context/AppContextProvider";
import axios from "axios";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Emailverify() {
  const inputRef=useRef([]);
  const { setuserData, setisLoggedin, backendURL } =
      useContext(AppContent);
      const navigate=useNavigate()

  const handleInput=(e,index)=>{
    if(e.target.value.length >0 && index<inputRef.current.length -1){
      inputRef.current[index+1].focus()
    }
  }
  const handleKeyDown=(e,index)=>{
    if(e.key ==="Backspace" && e.target.value === '' && index>0){
      inputRef.current[index-1].focus()
    }
  }
  const handlePaste=(e)=>{
    const paste=e.clipboardData.getData("text")
    const pasteArray=paste.split('')

    pasteArray.forEach((char,index)=>{
      if(inputRef.current[index]){
        inputRef.current[index].value=char;
      }
    });
  }
  const onsubmitHandler=async(event)=>{
    try {
      event.preventDefault();
      const otpArray=inputRef.current.map(e=>e.value);
      const otp=otpArray.join('')
      axios.defaults.withCredentials=true;
      const {data}=await axios.post(`${backendURL}/api/auth/send-verify-otp`,{otp},{validateStatus:()=>true});
      
        if(data.success){
          toast(data.message);
          setisLoggedin(true)
          setuserData(data.user.name)
          navigate('/');
        }else{
          toast(data.message)
        }
    } catch (error) {
      console.log(error);
      
      toast.error(error.message)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm-px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      
      <div className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Email Verify OTP.
        </h2>
        <p className="text-center text-sm mb-3">
          Enter 6 Digit code sent to Email id.
        </p>
        <form onSubmit={onsubmitHandler}>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 text-white text-center text-xl rounded-md bg-[#33A5C0] border border-transparent focus:border-white focus:outline-none"
                ref={e=>inputRef.current[index]=e}
                onInput={(e)=>handleInput(e,index)}
                onKeyDown={(e)=>handleKeyDown(e,index)}
              />
            ))}
        </div>
        <Button type="submit" className="w-full bg-white text-[#33A5C0] font-semibold hover:bg-gray-200 transition">Submit</Button>
        </form>
        
      </div>
    </div>
  );
}
