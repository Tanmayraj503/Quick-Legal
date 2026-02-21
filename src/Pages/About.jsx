import React from 'react';
import { FaEye } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { motion } from 'framer-motion';
import AnimatedContent from '../components/AnimatedContent'


export default function About() {
    const stand = [
        {
            title: "Transparency",
            description: "We believe everyone deserves to know exactly what they're agreeing to — in plain language, not legalese."
        },
        {
            title: "Protection",
            description: "Our mission is to protect everyday users from hidden clauses that corporations use to their advantage."
        },
        {
            title: "Simplicity",
            description: "Legal analysis shouldn't take a law degree. We make it fast, simple, and accessible to everyone."
        },
        {
            title: "Privacy First",
            description: "We don't store your documents. What you paste stays between you and the AI — nothing more."
        }
    ];
    const stats = [
        { value: "95%", label: "Analysis Accuracy" },
        { value: "5s", label: "Average Response Time" },
        { value: "50+", label: "Risk Categories" },
        { value: "100%", label: "Free to Use" },
    ];
    const icons = [
        FaEye,
        IoShield,
        FaBoltLightning,
        FaLock,
    ];

    const isMObile = window.innerWidth<768;

    return (
        <>
            <Header />
            <div className='min-w-full min-h-screen pt-10 lg:pt-12 pb-24'>
                <div className='flex flex-col justify-center items-center mx-auto px-7'>
                    <div className='pt-24 lg:pt-26 flex md:gap-3 flex-col justify-center items-center mx-auto'>
                        <motion.p className='text-[#bd9c2d]  font-bold text-[36px] sm:text-[42px] md:text-5xl '
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>Built for People,</motion.p>
                        <motion.p className='text-[#bd9c2d] font-bold  mb-1 text-[36px] sm:text-[42px] md:text-5xl'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}>Not Corporations</motion.p>
                    </div>
                    <motion.p className='text-gray-300 text-lg mt-6 max-w-200 text-center'
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}>
                        Quick-Legal was born out of frustration. Every day, millions of people click "I Agree" on documents they've never read - documents that can sign away their privacy, data, and rights. We built Quick-Legal to change that.</motion.p>
                </div>
                <div
                    className="grid sm:grid-cols-2 mx-auto px-7 mt-10 sm:mt-25 gap-5"
                >
                    {stats.map((stat, index) => (
                        <AnimatedContent
                            key={index}
                            distance={40}
                            direction="vertical"
                            reverse={false}
                            duration={0.9}
                            ease="power3.out"
                            initialOpacity={0}
                            animateOpacity
                            scale={1}
                            threshold={0.1}
                            delay={0.1 + index * 0.1}
                        >
                            <div
                                key={index}
                                whileHover={{ translateY: -4 }}
                                className="flex flex-col justify-center items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 duration-200"
                            >
                                <p className="text-[#bd9c2d] font-semibold text-[34px]">
                                    {stat.value}
                                </p>
                                <p className="text-gray-300 text-center">
                                    {stat.label}
                                </p>
                            </div>
                        </AnimatedContent>
                    ))}
                </div>
                <motion.div className='mt-34 px-7 mb-20'
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}>
                    <div className='flex flex-col justify-center item-center bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                        <h1 className='text-[#bd9c2d] text-[40px] text-start font-semibold'>Our Mission</h1>
                        <p className='text-gray-300 mt-3'>Terms of Service documents have average 30,000+ words — longer than most novels. Companies spend millions crafting these documents to protect themselves, often at the user's expense.Terms of Service documents average 30,000+ words — longer than most novels. Companies spend millions crafting these documents to protect themselves, often at the user's expense.</p>
                        <p className='text-gray-300 mt-4'>Quick-Legal levels the playing field. By combining AI with legal expertise, we scan these documents in seconds and surface what actually matters — so you can make an informed decision before clicking "I Agree."</p>
                        <div className='mt-10 '>
                            <div className='p-7 bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border-white/10 flex flex-col mx-auto justify-center items-center max-w-56'>
                                <p className='font-bold text-[#bd9b2dc1] text-center text-[56px] '>91%</p>
                                <p className='text-gray-300 text-center max-w-39'>of users never read T&C before agreeing</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div className='px-7'>
                    <motion.h1 className='text-center text-[40px] font-semibold text-[#bd9c2d] mt-30 mb-10'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}>What We Stand For</motion.h1>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                        {stand.map((titl, index) => {
                            const Icon = icons[index];
                            return (
                                <AnimatedContent
                                    key={index}
                                    distance={40}
                                    direction="vertical"
                                    reverse={false}
                                    duration={1.2}
                                    ease="power3.out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.1 + index * 0.1}
                                >
                                    <div className='flex flex-col justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-4 px-6'>
                                        <div className='flex flex-col sm:flex-row gap-5 items-center-safe'>
                                            <div className='p-4 bg-[#bd9b2d38] rounded-xl'>
                                                <Icon className='text-[25px] text-[#bd9c2d]' />
                                            </div>
                                            <div>
                                                <h1 className='text-[#bd9c2d] text-center sm:text-start font-semibold sm:text-[30px] text-[26px]'>
                                                    {titl.title}
                                                </h1>
                                                <p className='text-gray-300 text-center sm:text-start'>
                                                    {titl.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedContent>
                            );
                        })}
                    </div>
                </div>
                <div className='mt-34 px-7 mb-20'>
                    <div className='flex flex-col justify-center item-center'>
                        <motion.h1 className='text-center text-[40px] font-semibold text-[#bd9c2d] mt-10 mb-10'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>Meet the Team</motion.h1>
                        <motion.div className='mb-8'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                            <div className=' bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                                <div className='flex justify-center items-center backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 bg-yellow-300/12 mx-auto mb-5'>
                                    <h2 className='text-5xl font-bold text-[#bd9c2d]'>T</h2>
                                </div>
                                <h1 className='sm:text-3xl text-[26px] font-semibold text-center text-[#bd9c2d]'>Tanmay Raj</h1>
                                <p className='text-gray-300 mt-2 sm:mt-5 text-center xl:px-40'>Founder & Developer
                                    "A developer with a passion for AI-driven solutions, Tanmay built Quick-Legal to bridge the gap between complex legal language and everyday users — leveraging modern AI to make legal clarity accessible to all."</p>
                            </div>
                        </motion.div>
                        <motion.div className=''
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}>
                            <div className=' bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                                <div className='flex justify-center items-center backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 bg-yellow-300/12 mx-auto mb-5'>
                                    <h2 className='text-5xl font-bold text-[#bd9c2d]'>A</h2>
                                </div>
                                <h1 className='sm:text-3xl text-[26px] font-semibold text-center text-[#bd9c2d]'>Archna Kumari</h1>
                                <p className='text-gray-300 mt-2 sm:mt-5 text-center xl:px-40'>UI/UX Design Analyst
                                    "A UI/UX Design Analyst with a passion for AI-driven solutions"</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <ScrollToTopButton />
            <Footer />
        </>
    );
}