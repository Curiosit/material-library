
"use client"

import { EPDProps, MaterialProps } from '@/types';
import React from 'react';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CustomButton } from '.';
import { useState, useEffect } from 'react'
import BarChart from './BarChart';




interface MaterialDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    material: EPDProps;
}

const MaterialDetails = ({isOpen, closeModal, material}: MaterialDetailsProps) => {
  const [json, setJson] = useState('');
  
  
  const createEPDx = () => {
    const declared_factor = 1
    const declared_unit = 1
    const original_id = "ID"
    const epdx_dict = {
        'id':original_id,
        'format_version': "0.3.0",
        'name':material.name,
        'version':"version 2 - 201222",
        'declared_unit':declared_unit,
        'valid_until':"2025-12-22T00:00:00",
        "published_date": "2020-12-22T00:00:00",
        'standard':'EN15804A1',
        'subtype':"Generic",
        'comment':'table7_id',
        'reference_service_life':'',
        'location':"DK",
        'conversions':[
            {"to": 'KG',
             "value": ((material.mass || 1 ) * declared_factor)}
        ],
        gwp:{
            "a1a3": ((material.A1A3 || 0) * declared_factor),
            "a4": null,
            "a5": null,
            "b1": null,
            "b2": null,
            "b3": null,
            "b4": null,
            "b5": null,
            "b6": null,
            "b7": null,
            "c1": null,
            "c2": null,
            "c3": ((material.C3 || 0) * declared_factor),
            "c4":((material.C4 || 0) * declared_factor),
            "d": ((material.D || 0) * declared_factor),
        },
        "source": {
          "name": "BR18 - Tabel 7",
          "url": (material.url || ''),
        },
      }
      console.log(epdx_dict)
      return epdx_dict;

  }
  
  
  return (
    <>
    <Transition appear show={isOpen}
    as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25">

              
            </div>
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2x1 
                rounded-lg bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5" >
                  <button
                  type="button"
                  onClick={closeModal}
                  className='absolute top-1 right-2 z-10 w-fit p-2 bg-primary-green-100 rounded-full'
                  >
                    <Image 
                    src="close.svg"
                    alt="close"
                    width={20}
                    height={20}
                    className="object-contain"
                    />
                  </button>

                  <div className="flex-1 flex flex-col gap-3">

                    
                  
                  
                        
        


                  </div>
                  <div className='flex-1 flex flex-col gap-2'>
                    <h2 className='font-semibold text-xl capitalize'> {material.name}</h2>
                    <div className='mt-3 flex flex-wrap gap-4'>
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>TOTAL</h4>
                            <p className='text-black-100 font-semibold'>{material.TOTAL  } kgCO2 / {material.unit}</p>
                          </div>
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>A1-A3</h4>
                            <p className='text-black-100 font-semibold'>{material.A1A3} kgCO2 / {material.unit}</p>
                          </div>
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>C3</h4>
                            <p className='text-black-100 font-semibold'>{material.C3} kgCO2 / {material.unit}</p>
                          </div>
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>C4</h4>
                            <p className='text-black-100 font-semibold'>{material.C4} kgCO2 / {material.unit}</p>
                          </div>
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>D</h4>
                            <p className='text-black-100 font-semibold'>{material.D} kgCO2 / {material.unit}</p>
                          </div>
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>Density</h4>
                            <p className='text-black-100 font-semibold'>{material.mass} kg / {material.unit}</p>
                          </div>
                          { material.mass ? (
                            <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'>TOTAL /KG</h4>
                            <p className='text-black-100 font-semibold'>{Math.round((material.TOTAL || 0) / material.mass * 1000)/1000  } kgCO2 / KG</p>
                          </div>
                          ) : null }


                          <div className='w-full'><BarChart material={material} /></div>
                          
                          <div className='flex justify-between gap-5 w-full text-right' >
                            <h4 className='text-grey capitalize'><a href={material.url}>{material.url}</a></h4>
                            
                          </div>

                      {/* {Object.entries(material).map(([key, value]) => (
                        <div className='flex justify-between gap-5 w-full text-right' key={key}>
                          <h4 className='text-grey capitalize'>{key.split("_").join(" ")}</h4>
                          <p className='text-black-100 font-semibold'>{String(value)}</p>
                        </div>
                      ))} */}
                      <a
                      href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(createEPDx())
                      )}`}
                      download="epdx.json"
                      >
                      {`Download EPDx Json`}
                    </a>
                      {/* <CustomButton
                          title="Download EPDx"
                          btnType='button'
                          containerStyles="bg-primary-green hover:bg-transparent text-white hover:text-primary-green py-2 px-4 border border-primary-green rounded-full"
                          handleClick={generateEPDx}
                      /> */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>

            </div>
          </div>
        </Dialog>

    </Transition>
    </>
  )
}

export default MaterialDetails