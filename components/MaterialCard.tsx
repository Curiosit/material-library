"use client"

import { EPDProps, MaterialProps } from "@/types";
import Image from "next/image";
import React from 'react'
import { useState } from 'react'
import { CustomButton, MaterialDetails } from ".";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
 
interface EPDCardProps {
    material: EPDProps;
}

function MaterialCard({ material}:EPDCardProps) {
    const {name, A1A3, C3, C4, D, unit, mass} = material;
    console.log(material);
    
    const [isOpen, setIsOpen ] = useState(false);
  return (
    <div className="car-card group">
        <div className="car-card__content">
            <h2 className="car-card__content-title">{name}</h2>
        </div>
        
            <p className="flex mt-1 mb-1 text-[16x]">
            
            {material.TOTAL  } kgCO2 / {material.unit}
            </p>
        
        <div className="relative flex w-full mt-3">
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/assign.png" width={20} height={20} alt="steering wheel" />
                    <p className='text-[14px]'>
                        A1-A3: {A1A3} kgCO2
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
                       /{unit}  
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