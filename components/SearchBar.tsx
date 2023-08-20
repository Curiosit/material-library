"use client"

import { useState } from 'react';
import React from 'react'
import { SearchMaterial } from '.';
import Image from 'next/image';
import {useRouter} from 'next/navigation'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
    src="/magnifying-glass.svg"
    alt="magnyfying glass"
    height={40}
    width={40}
    className='object-contain'
    />

  </button>
)

const SearchBar = () => {
    const [materialType, setMaterialType] = useState('');
    const [model, setModel] = useState('');
    const router = useRouter();
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(materialType);
      if(materialType === '' && model === '' ) {
        return alert('Please fill in the search bar')
      }
      
      updateSearchParams(model.toLowerCase(), materialType.toLowerCase());
    };

    const updateSearchParams = (model:string, materialType:string) => {
      const searchParams = new URLSearchParams(window.location.search);
      if(model) {
        searchParams.set('model', model);
      } else {
        searchParams.delete('model');
      }
      if(materialType) {
        searchParams.set('materialType', materialType);
      }else {
        searchParams.delete('materialType');
      }

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`
      console.log(newPathname);
      router.push(newPathname, {scroll: false});
    }
  return (


    <form className='searchbar' onSubmit={handleSearch}>

        <div className="searchbar__item">

            <SearchMaterial 
            materialType = {materialType}
            setMaterialType={setMaterialType}
            />
            <SearchButton otherClasses="sm:hidden"/>

        </div>
        <div className="searchbar__item">
          <Image 
          src="/model-icon.png"
          width={25}
          height={25}
          alt="car model"
          className = "absolute w-[20px] h-[20px] ml-4"
          />
          <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className='searchbar__input'
          />
          <SearchButton otherClasses="sm:hidden"/>
        </div>
        <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar