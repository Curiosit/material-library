"use client";
import React from 'react'
import Image from 'next/image'
import { CustomButton } from '.'
import { useRouter } from 'next/navigation';
import { updateSearchParams } from '@/utils'
const Hero = () => {
    const router = useRouter();
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    
    
    const exploreMaterials = () => {
      
      router.push('./library');
    }
    const exploreData = () => {
      
      router.push('./dataviz');
    }
  return (
    <div className='mt-12 padding-x padding-y max-width'>
        <div className=''>
        
            <h1 className='hero__title flex '  >
            <Image
                        src="/widgets.png"
                        alt="Logo"
                        width={68}
                        height={68}
                        className="object-contain"

                    ></Image>
                Easy Material Library</h1>
            <p className='hero__subtitle'>
                Sort and pick the most suitable material for your project!</p>
          <div className='w-full flex-center'>
                <CustomButton 
                title="Material Library"
                containerStyles="bg-primary-green hover:bg-transparent text-white hover:text-primary-green py-2 px-4 border border-primary-green rounded-full m-2"
                handleClick={exploreMaterials}
                />
                <CustomButton 
                title="Data Visualization"
                containerStyles="bg-primary-green hover:bg-transparent text-white hover:text-primary-green py-2 px-4 border border-primary-green rounded-full m-2"
                handleClick={exploreData}
                />
                </div>
        </div>
        
    </div>
  )
}

export default Hero