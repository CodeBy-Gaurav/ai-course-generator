"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button';
import React from 'react'
import { HiMiniSquares2X2,  HiLightBulb,  HiClipboardDocumentCheck } from "react-icons/hi2";
import SelectCategory from './_components/SelectCategory';

function CreateCourse() {
  const stepperOptions = [
    {
      id: 1,
      name: 'category',
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: 'Topic & Desc',
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: 'Options',
      icon: <HiClipboardDocumentCheck />,
    }
  ]
  const [activeIndex, setActiveIndex] = useState(0)
  
  return (
    <div>
        {/* stepper */}
        <div className='flex flex-col justify-center items-center mt-10'>
            <h2 className="text-4xl text-primary font-medium">Create Course</h2>
            <p className="text-gray-500 mt-2">Create your personalized course in just a few easy steps</p>
        </div>
        <div className='flex justify-center mt-10'>
            {stepperOptions.map((item,index)=>(
                <div className='flex items-center'>
                    <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                        <div className={`bg-gray-200 p-3 rounded-full text-white 
                            ${activeIndex>=index ? 'bg-primary text-white shadow-lg scale-110' : ''}`}>
                            {item.icon}
                        </div>
                        <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                    </div>
                    {index!=stepperOptions?.length-1 && <div className={`h-1 rounded-full w-[50px] md:w-[100px] lg:w-[170px] bg-gray-300
                         ${activeIndex>index ? 'bg-primary' : ''}`}>

                    </div>}
                </div>
            ))}
        </div>
        <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {/* components */}
        {activeIndex==0?<SelectCategory />:null}
        {/* next prev button  */}
        <div className='flex justify-between mt-10'>
            <Button disabled={activeIndex===0}
            variant='outline'
            onClick={() => setActiveIndex(activeIndex-1)}>Previous</Button>
            {activeIndex<2 && <Button onClick={() => setActiveIndex(activeIndex+1)}>Next</Button>}
            {activeIndex==2 &&<Button onClick={() => setActiveIndex(activeIndex+1)}>Generate Course Layout</Button>}
        </div>
        </div>
    </div>
  )
}

export default CreateCourse