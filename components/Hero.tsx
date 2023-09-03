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
    <div className='Hero'>
        <div className='flex-1 pt-36 padding-x'>
        
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

                <CustomButton 
                title="Explore Materials"
                containerStyles="bg-primary-green text-white rounded-full mt-10"
                handleClick={handleScroll}
                />
        </div>
        <div className="hero__image-container">
            <div className='hero__image'>
                <Image src="/pngegg.png"
                alt="hero"
                fill className="object-contain"
                />
                </div>
                <div className="hero__image-overlay" />

                



            
        </div>
    </div>
  )
}

export default Hero