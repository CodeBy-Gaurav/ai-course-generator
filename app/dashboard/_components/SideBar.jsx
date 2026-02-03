"use client"
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiHome, HiMiniSquare3Stack3D, HiMiniShieldCheck, HiMiniPower  } from "react-icons/hi2";
import { Progress } from "@/components/ui/progress"

function Sidebar() {
    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<HiHome size={24} />,
            path:'/dashboard'
        },
         {
            id:2,
            name:'Explore',
            icon:<HiMiniSquare3Stack3D size={24} />,
            path:'/dashboard/explore'
        },
         {
            id:3,
            name:'Upgrade',
            icon:<HiMiniShieldCheck size={24} />,
            path:'/dashboard/upgrade'
        },
         {
            id:4,
            name:'Logout',
            icon:<HiMiniPower size={24} />,
            path:'/dashboard/logout'
        },
        
        
    ]
    const path=usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={'/logo.svg'} width={250} height={100} alt='Logo' />
        <hr className='my-5'/>
        <div>
            <ul>
            {Menu.map((item,index)=>(
                <Link href={item.path}>
                <div key={index} className={`flex items-center gap-2 text-gray-600 p-3
                cursor-pointer hover:bg-gray-200 hover:text-black rounded-lg ${path === item.path ? 'bg-gray-200 text-black' : ''} mb-2`}>
                    <div className='text-2xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            )
            )}
            </ul>
            <div className='absolute bottom-10 w-[80%]'>
                <Progress value={60} />
                <h2 className='text-sm my-2'>3 out of 5 courses created</h2>
                <h2 className='text-xs text-gray-500'>upgrade to premium for unlimited access</h2>
            </div>
        </div>
    </div>
  )
}

export default Sidebar