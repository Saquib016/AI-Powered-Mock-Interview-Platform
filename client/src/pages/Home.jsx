import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
    BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import evalImg from "../assets/ai-ans.png"
import Authmodel from '../components/Authmodel.jsx';
import hrImg from "../assets/HR.png"
import techImg from "../assets/tech.png"
import confidenceImg from "../assets/confi.png"
import creditImg from "../assets/credit.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"
function
    Home() {
    const { userData } = useSelector((state) => state.user)
    const [showAuth, setshowAuth] = useState(false)
    const navigate = useNavigate()
    return (
        <div className='min-h-screen bg-black flex flex-col'>
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 left-20 h-[32rem] w-[32rem] rounded-full bg-green-500/10 blur-[180px]" />
                <div className="absolute top-40 right-20 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[180px]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-[180px]" />
            </div>
            <Navbar />
            <div className='flex-1 px-6 py-20'>
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-3 shadow-xl"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/15">
                            <HiSparkles size={16} className="text-green-400" />
                        </div>

                        <span className="text-sm font-medium tracking-wide text-gray-200">
                            AI-Powered Smart Interview Platform
                        </span>
                    </motion.div>
                </div>
                <div className='text-center mb-28'>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-white text-5xl md:text-7xl font-bold leading-tight max-w-5xl mx-auto"
                    >
                        Practice Interviews With
                        <br />

                        <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                            RizQ.AI
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-gray-300 mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-8"
                    >
                        Practice role-specific mock interviews with AI, adaptive follow-up questions,
                        real-time feedback, and detailed performance insights.
                    </motion.p>
                    <div className="flex flex-wrap justify-center gap-5 mt-12">

                        <motion.button
                            onClick={() => {
                                if (!userData) {
                                    setshowAuth(true);
                                    return;
                                }
                                navigate("/interview");
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold shadow-xl shadow-green-500/20 transition-all"
                        >
                            Start Interview
                        </motion.button>

                        <motion.button
                            onClick={() => {
                                if (!userData) {
                                    setshowAuth(true);
                                    return;
                                }
                                navigate("/history");
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-10 py-4 text-white shadow-lg transition-all hover:bg-white/10"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />

                            <span className="relative">
                                View History
                            </span>
                        </motion.button>

                    </div>
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
                    {
                        [
                            {
                                icon: <BsRobot size={24} />,
                                step: "STEP 1",
                                title: "Role & Experience Selection",
                                desc: "AI adjusts difficulty based on selected job role."
                            },
                            {
                                icon: <BsMic size={24} />,
                                step: "STEP 2",
                                title: "Smart Voice Interview",
                                desc: "Dynamic follow-up question based on your answers."
                            },
                            {
                                icon: <BsClock size={24} />,
                                step: "STEP 3",
                                title: "Timer Based Simulation",
                                desc: "Real interview Pressure with time tracking."

                            }
                        ].map((item, index) => (
                            <motion.div

                                initial={{
                                    opacity: 0,
                                    rotate: index === 0 ? -20 : index === 1 ? 15 : -15,
                                    y: 150
                                }}

                                animate={{
                                    opacity: 1,
                                    rotate: index === 0 ? -6 : index === 1 ? 3 : -4,
                                    y: 0
                                }}

                                transition={{
                                    delay: index * 0.25,
                                    duration: 0.8
                                }}
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    rotate: 0,
                                    y: -12,
                                    scale: 1.05
                                }}
                                transition={{ duration: 0.5 }}
                                className={`
                                relative
                                w-80
                                max-w-full
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                p-8
                                text-white
                                shadow-xl
                                hover:border-green-400/40
                                transition-all
                                duration-300

                                ${index === 0 ? "-rotate-6" : ""}
                                ${index === 1 ? "rotate-3 md:-mt-8" : ""}
                                ${index === 2 ? "-rotate-4" : ""}
                                `}
                            >

                                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10 text-green-400 backdrop-blur-xl">
                                    {item.icon}
                                </div>

                                <div className="pt-10 text-center">

                                    <div className="mb-3 text-xs font-semibold tracking-[0.25em] text-green-400">
                                        {item.step}
                                    </div>

                                    <h3 className="mb-4 text-xl font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="leading-7 text-gray-300">
                                        {item.desc}
                                    </p>

                                </div>

                            </motion.div>
                        ))
                    }

                </div>
                <div className='mb-32'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-white/50 text-4xl font-semibold text-center mb-16'>
                        Advanced AI{" "}
                        <span className='text-green-600'> Capabilities</span>
                    </motion.h2>
                    <div className='grid md:grid-cols-2 gap-10'>{
                        [
                        {   image:evelImg,
                            icon:<BsBarChart size={20} />,
                            title:"AI Answer Evaluation",
                            desc:"Score Communication, technical accuracy and confidence."
                        }
                        ]}
                    </div>
                </div>
            </div>
            {showAuth && <Authmodel onclose={() => setshowAuth(false)} />}

        </div>
    )
}

export default Home