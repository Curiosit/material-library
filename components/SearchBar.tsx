"use client"

import { useState } from 'react';
import React from 'react'
import { SearchMaterial } from '.';
const SearchBar = () => {
    const [materialType, setMaterialType] = useState('');
    const handleSearch = () => {};
  return (


    <form className='searchbar' onSubmit={handleSearch}>

        <div className="searchbar__item">

            <SearchMaterial 
            materialType = {materialType}
            setMaterialType={setMaterialType}
            />
        </div>
    </form>
  )
}

export default SearchBar