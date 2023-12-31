"use client"

import { useState } from 'react';
import React from 'react'
import { SearchMaterial } from '.';
import Image from 'next/image';
import {useRouter} from 'next/navigation'



const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`ml-3 z-10 ${otherClasses}`}>
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
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();
    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(type);
      if(name === '' ) {
        return alert('Please fill in the search bar')
      }
      
      updateSearchParams(name.toLowerCase());
    };

    const updateSearchParams = (model:string) => {
      const searchParams = new URLSearchParams(window.location.search);
      if(name) {
        searchParams.set('name', name.toLowerCase());
      } else {
        searchParams.delete('name');
      }
      

      const newPathname = `${window.location.pathname}?${searchParams.toString()}`
      console.log(newPathname);
      router.push(newPathname, {scroll: false});
    }
    const ClearButton = ({ otherClasses }: { otherClasses: string }) => (
      <button type='button' className={`ml-3 z-10 ${otherClasses}`}>
        <Image
        src="/close-button.svg"
        alt="clear"
        height={40}
        width={40}
        className='object-contain'
        onClick={handleClickClear}
        />
    
      </button>
    )
    const handleClickClear = () => {
      router.push("/", {scroll: false});
    }
  return (


    <form className='searchbar' onSubmit={handleSearch}>

        
        <div className="searchbar__item">
          <Image 
          src="/title.png"
          width={25}
          height={25}
          alt="name"
          className = "absolute w-[20px] h-[20px] ml-4"
          />
          <input
          type="text"
          name="model"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Brick"
          className='searchbar__input'
          />
          <SearchButton otherClasses="sm:hidden"/>
          <ClearButton otherClasses="sm:hidden"/> 
        </div>
        <SearchButton otherClasses="max-sm:hidden"/>
        <ClearButton otherClasses="max-sm:hidden"/> 
    </form>
  )
}

export default SearchBar