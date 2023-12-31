"use client"
import { SearchMaterialTypeProps } from '@/types'
import React from 'react'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useState, Fragment } from 'react'

import { materialTypes } from '@/constants'
const SearchMaterial = ({type, setType}:SearchMaterialTypeProps) => {
  
  const [query, setQuery] = useState('');
  
  const filteredMaterials = 
  query ==="" 
  ? materialTypes 
  : materialTypes.filter((item) => (
    item.toLowerCase().replace(/\s+/g, "")
    .includes(query.toLowerCase().replace(/\s+/g, ""))
  ))
  console.log(filteredMaterials);

  return (
    <div className='search-manufacturer'>
        <Combobox
        value={type}
        onChange={setType}
        >
            <div className="relative w-full">

              <Combobox.Button className="absolute top-[14px]">
                <Image 
                src="/widgets.png"
                width={20}
                height={20}
                className="ml-4"
                alt="Material"
                />
              </Combobox.Button>

              <Combobox.Input 
                className="search-manufacturer__input"
                placeholder="Structural"
                displayValue={(materialType: string) => materialType}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave = {() => setQuery('')}
                >
                  <Combobox.Options>
                    {
                      filteredMaterials.map((item) => (
                        <Combobox.Option
                          key={item}
                          className={({active}) => `
                            relative search-manufacturer__option
                            ${active ? 'bg-primary-green text-white' : 'text-gray'}
                            '}
                          `}   
                          value={item}                     >
                            
                            {({selected, active}) => (
                                <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {item}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? 'text-white' : 'text-teal-600'
                                    }`}
                                  >
                                    
                                  </span>
                                ) : null}
                              </>

                           )
                            }

                          </Combobox.Option>
                      ))
                    }
                  </Combobox.Options>
              </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchMaterial