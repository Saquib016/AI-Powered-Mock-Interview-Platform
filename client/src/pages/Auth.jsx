import React from 'react'
import { motion } from "motion/react"
import { AiFillRobot } from "react-icons/ai";
import { PiRobot } from "react-icons/pi";
import { SiRobotframework } from "react-icons/si";
import { IoSparklesSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { signInAnonymously, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebse';
import { ServerUrl } from '../App';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../readux/userSlice';
function Auth({ isModel = false }) {
    const dispatch = useDispatch()
    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
            console.log(result.data)
        } catch (error) {
            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log("Full Error:", error);

            dispatch(setUserData(null));
        }
    }
    return (
        <div
            className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#e4e4e4] flex items-center justify-center px-6 py-20"}`}>
            <motion.div initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.05 }}
                className={`
                    w-full 
                    ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
                    bg-white shadow-2xl border border-gray-200`}>
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className='bg-black text-white p-2 rounded-lg'>
                        <SiRobotframework size={18} />
                    </div>
                    <h2 className='font-semibold text-lg'>
                        RizQInterview.AI
                    </h2>
                </div>
                <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                    Continue With
                    <br />
                    <span className='bg-green-100 text-green-600 px-2 py-1 rounded-full inline-flex items-center gap-1'>
                        <IoSparklesSharp size={16} />
                        AI Smart Interview
                    </span>
                </h1>
                <p className='text-gray-500 text-center text-sm md:textleading-relaxed-base leading-relaxec mb-8'>
                    Sign in To Start AI-Mock Interview.
                </p>
                <motion.button onClick={handleGoogleAuth}
                    whileHover={{ opacity: 0.7, scale: 1.03 }}
                    whileTap={{ opacity: 1, scale: 0.98 }}
                    className='w-full flex item-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md'>
                    <FcGoogle size={20} />
                    Continue With Google
                </motion.button>
            </motion.div>
        </div>
    )
}

export default Auth