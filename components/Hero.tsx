"use client";
import React from 'react'
import Image from 'next/image'
import { CustomButton } from '.'

const Hero = () => {
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
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
                title="Explore Materials"
                containerStyles="bg-primary-green text-white rounded-full mt-10"
                handleClick={handleScroll}
                />
                </div>
        </div>
        
    </div>
  )
}

export default Hero