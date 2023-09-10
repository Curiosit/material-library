"use client"

import { MaterialTable7Props } from "@/types";
import Image from "next/image";
import React from 'react'
import { useState } from 'react'
import { CustomButton, MaterialDetails } from ".";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
 
interface MaterialCardProps {
    material: MaterialTable7Props;
}

function MaterialCard({ material}:MaterialCardProps) {
    const {NAVN} = material;
    console.log(material);
    
    const [isOpen, setIsOpen ] = useState(false);
  return (
    <div className="car-card group">
        <div className="car-card__content">
            <h2 className="car-card__content-title">{NAVN}</h2>
        </div>
        <p className="flex mt-6 text-[32px] font-extrabold">
            
            
        </p>
        <div className="relative w-full h-40 my-3 object-contain">
            <Image src='/error.png' alt="material card img" fill priority className="object-contain" />
        </div>
        <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/assign.png" width={20} height={20} alt="steering wheel" />
                    <p className='text-[14px]'>
                        {/* {type.toUpperCase()} */}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    {/* {biogenic ? (<><Image src="/leaf.png" width={20} height={20} alt="tire" />
                    <p className='text-[14px]'>
                       BIO
                    </p></>) : (<><Image src="/smoke.png" width={20} height={20} alt="tire" />
                    <p className='text-[14px]'>
                       FOSSIL
                    </p></>)} */}
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/weight.png" width={20} height={20} alt="gas" />
                    <p className='text-[14px]'>
                       {/*  {density} kg/m3  */}
                    </p>
                </div>
            </div>

            <div className="car-card__btn-container">
            <CustomButton
            title="View more"
            containerStyles="w-full py-[16px] rounded-full bg-primary-green"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
            />
            </div>


        </div>
        <MaterialDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} material={material} /> 

    </div>

  )
}

export default MaterialCard