import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React from 'react'

function SelectCategory() {
  return (
    <div>
        {CategoryList.map((item,index)=>(
            <div key={item.id}>
                <Image  src={item.icon} width={50} height={50} alt={item.name} />
            </div>
       ) )}
    </div>
  )
}

export default SelectCategory