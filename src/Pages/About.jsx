import React from 'react';
import { FaEye } from "react-icons/fa";
import { IoShield } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";


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
    const icons = [
        FaEye,
        IoShield,
        FaBoltLightning,
        FaLock,
    ];
    return (
        <div className='min-w-full min-h-screen pt-26 lg:pt-28 pb-24'>
            <div className='flex flex-col justify-center items-center mx-auto px-7'>
                <div className=' pt-28 lg:pt-30 flex md:gap-3 flex-col justify-center items-center mx-auto'>
                    <p className='text-[#bd9c2d]  font-semibold text-[36px] sm:text-[42px] md:text-5xl '>Built for People,</p>
                    <p className='text-[#bd9c2d] font-semibold  mb-1 text-[36px] sm:text-[42px] md:text-5xl'>Not Corporations</p>
                </div>
                <p className='text-gray-300 text-lg mt-5 max-w-200 text-center'>Quick-Legal was born out of frustration. Every day, millions of people click "I Agree" on documents they've never read - documents that can sign away their privacy, data, and rights. We built Quick-Legal to change that.</p>
            </div>
            <div className='grid sm:grid-cols-2 mx-auto px-7 mt-10 sm:mt-20 gap-5'>
                <div className='flex hover:-translate-y-1 duration-200 flex-col justify-center items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 w-50%'>
                    <p className='text-[#bd9c2d] font-semibold text-[34px]'>
                        95%
                    </p>
                    <p className='text-gray-300'>
                        Analysis Accuracy
                    </p>
                </div>
                <div className='flex hover:-translate-y-1 duration-200 flex-col justify-center items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 w-50%'>
                    <p className='text-[#bd9c2d] font-semibold text-[34px]'>
                        5s
                    </p>
                    <p className='text-gray-300 text-center'>
                        Average Response Time
                    </p>
                </div>
                <div className='flex hover:-translate-y-1 duration-200 flex-col justify-center items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6  w-50%'>
                    <p className='text-[#bd9c2d] font-semibold text-[34px]'>
                        50+
                    </p>
                    <p className='text-gray-300'>
                        Risk Categories
                    </p>
                </div>
                <div className='flex hover:-translate-y-1 duration-200 flex-col justify-center items-center   bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 w-50%'>
                    <p className='text-[#bd9c2d] font-semibold text-[34px]'>
                        100%
                    </p>
                    <p className='text-gray-300'>
                        Free to Use
                    </p>
                </div>
            </div>
            <div className='mt-30 px-7 mb-20'>
                <div className='flex flex-col justify-center item-center bg-white/5 backdrop-blur-xl p-10 border border-white/10 rounded-2xl shadow-2xl'>
                    <h1 className='text-[#bd9c2d] text-[40px] text-start font-semibold'>Our Mission</h1>
                    <p className='text-gray-300 mt-3'>Terms of Service documents have average 30,000+ words — longer than most novels. Companies spend millions crafting these documents to protect themselves, often at the user's expense.Terms of Service documents average 30,000+ words — longer than most novels. Companies spend millions crafting these documents to protect themselves, often at the user's expense.</p>
                    <p className='text-gray-300 mt-4'>Quick-Legal levels the playing field. By combining AI with legal expertise, we scan these documents in seconds and surface what actually matters — so you can make an informed decision before clicking "I Agree."</p>
                    <div className='mt-10 '>
                        <div className='p-7 bg-white/5 backdrop-blur-xl shadow-2xl rounded-2xl border-white/10 flex flex-col mx-auto justify-center items-center'>
                            <p className='font-bold text-[#bd9b2dc1] text-center text-[56px] '>91%</p>
                            <p className='text-gray-300 text-center max-w-39'>of users never read T&C before agreeing</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <h1 className='text-center text-[40px] font-semibold text-[#bd9c2d] mt-10 mb-10'>What We Stand For</h1>
                <div className='grid md:grid-cols-2 gap-5 px-7'>
                    {stand.map((titl, index) => {
                        const Icon = icons[index];
                        return (
                            <div key={index} className='flex flex-col justify-center  bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-4 px-6 w-50%'>
                                <div className='flex flex-col sm:flex-row gap-5 items-center-safe'>
                                    <div className='p-4 bg-[#bd9b2d38] rounded-xl'>
                                        <Icon className=' text-[25px] text-[#bd9c2d]' />
                                    </div>
                                    <div>
                                        <h1 className='text-[#bd9c2d] text-center sm:text-start font-semibold text-[30px]'>{titl.title}</h1>
                                        <p className='text-gray-300 text-center sm:text-start'>{titl.description}</p>
                                    </div>
                                </div>
                            </div>)
                    }
                    )}
                </div>
            </div>
        </div>
    );
}