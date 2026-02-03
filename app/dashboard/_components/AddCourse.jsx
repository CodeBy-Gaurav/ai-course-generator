"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function AddCourse() {
    const {user}= useUser();
  return (
    <div className='flex items-center justify-between'>
        <div>
            <p className='text-3xl'>Hello, 
                <span className='font-bold'> {user?.fullName}</span></p>
                <p className='text-sm text-gray-500'>Crete new course with AI, Share with friends and earn from it. </p>
        </div>
        <Link href={'/create-course'}>
        <Button className='mt-5'>+ Create New Course</Button>
        </Link>
    </div>
  )
}

export default AddCourse