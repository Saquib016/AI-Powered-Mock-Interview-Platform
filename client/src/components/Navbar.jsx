import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { SiRobotframework } from "react-icons/si";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ServerUrl} from "../App"
import { setUserData } from "../readux/userSlice";
import axios from "axios";
import Authmodel from "./Authmodel.jsx";
function Navbar() {
    const { userData } = useSelector((state) => state.user);
    const [showCreditPopup, setShowcreditPopup] = useState(false)
    const [showUserCreditPopup, setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    const [showAuth,setshowAuth] = useState(false)
    const handlelogout = async ()=>{
        try{
            await axios.get(ServerUrl + "/api/auth/logout",{withCredentials:true})
            dispatch(setUserData(null))
            setShowcreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error){
            console.log(error)
        }
    }
    return (
        <div className="bg-black flex justify-center px-4 pt-6">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-2 flex justify-between items-center relative"
            >
                <div className="flex items-center gap-3 cursor-pointer">

                    <div className="bg-black text-white p-2 rounded-lg">
                        <SiRobotframework size={18} />
                    </div>

                    <h1 className="font-semibold hidden md:block text-lg">RizQInterview.AI</h1>
                </div>
                <div className="flex items-center gap-6 relative">
                    <div className="relative">
                        <button onClick={() => {
                            if(!userData){
                                setshowAuth(true)
                                return;
                            }
                            setShowcreditPopup(!showCreditPopup);setShowUserPopup(false)}} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition">
                            <BsCoin size={20} />
                            {userData?.credits || 0}
                        </button>
                        {showCreditPopup && (
                            <div className="absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded p-5 z-50">
                                <p className="text-sm text-gray-600 mb-4">Need More Credits to Continue Your Preperation</p>
                                <button

                                    onClick={() => navigate("/pricing")}
                                    className="w-full bg-black text-white py-2 rounded-lg text-sm"
                                >
                                    Buy More Credits
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button 
                        
                        onClick={() => {
                            if(!userData){
                                setshowAuth(true)
                                return;
                            }
                            setShowUserPopup(!showUserCreditPopup) ; setShowcreditPopup(false)} }className="w-9 h-9 bg-black text-white text-2xl rounded-full flex items-center justify-center font-semibold">
                            {userData ? userData?.name.slice(0, 1).toUpperCase() : <FaUserAstronaut size={16} />}
                        </button>
                        {showUserCreditPopup && (
                            <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
                                <p className="text-md text-blue-500 font-medium mb-1">{userData?.name}</p>
                                <button onClick={() => navigate("/history")} className="w-full text-left text-sm py-2 hover:text-black text-gray-600">
                                    Interview History
                                </button>
                                <button onClick={handlelogout} className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-500">
                                    <HiOutlineLogout size={16} />
                                    LogOut
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
            {showAuth && <Authmodel onclose={()=>setshowAuth(false)}/>}
        </div>
    );
}

export default Navbar;
