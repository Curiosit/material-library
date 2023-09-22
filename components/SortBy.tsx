"use client"
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'
import { Listbox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { CustomButton } from '.'
interface sortByProps {
    textValue: String,
    sortByValue: String
    containerStyles?: string;
}
const SortBy = ({textValue, sortByValue, containerStyles}: sortByProps) => {
    const router = useRouter();
    const [selected, setSelected] = useState('')
    const handleUpdateParams = (sortByValue: any) => {
    const newPathName = updateSearchParams("sortby", sortByValue.toLowerCase())
    
    
    router.push(newPathName, {scroll: false});
  }
    
  return (
    <div className='w-full flex-center gap-5 mt-10'>
        
        <CustomButton 
                title={`${textValue}`}
                btnType='button'
                containerStyles={`${containerStyles} bg-transparent hover:bg-primary-green text-primary-green hover:text-white py-2 px-4 border border-primary-green hover:border-transparent rounded-full`}
                handleClick={() => handleUpdateParams(sortByValue)}
                
        />
        
    </div>
  )
}

export default SortBy