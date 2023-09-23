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
    sortingBy: string;
}
const SortBy = ({textValue, sortByValue, containerStyles, sortingBy}: sortByProps) => {
    const router = useRouter();
    
    console.log('sorting by');
    console.log(sortingBy);
    const isButtonActive = ((sortingBy.toLowerCase()) == sortByValue.toLowerCase())
    
    const handleUpdateParams = (sortByValue: any) => {
    const newPathName = updateSearchParams("sortby", sortByValue.toLowerCase())
    
    
    router.push(newPathName, {scroll: false});
  }
    
  return (
    <div className='w-full flex-center gap-5 mt-10'>
        
        <CustomButton 
                title={`${textValue}`}
                btnType='button'
                containerStyles={`${containerStyles} ${isButtonActive ? "bg-primary-green hover:bg-transparent text-white hover:text-primary-green" : "bg-transparent hover:bg-primary-green text-primary-green hover:text-white"}  py-2 px-4 border border-primary-green hover:border-transparent rounded-full`}
                handleClick={() => handleUpdateParams(sortByValue)}
                
        />
        
    </div>
  )
}

export default SortBy