

import { MaterialCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import Library from '@/components/Library';
import SortBy from '@/components/SortBy';
import { EPDProps, SearchParams, SearchParamsProps } from '@/types';

import { fetchCars, fetchEPDs, fetchMaterials } from '@/utils';

import Image from 'next/image'
import { useState } from 'react';

export default async function Home({searchParams}: SearchParamsProps) {
  
  const sortingBy = searchParams.sortby || '';
  
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">

        <div className='home__text-container'>
          {/* <h1 className='text-4x1 font-extrabold'>Material Library</h1> */}
          
        </div>
          <div className="home__filters" id='discover'>
            <SearchBar />

            

            <div className="flex align-top">
              <SortBy containerStyles='overflow-hidden' textValue='A1A3 GWP' sortByValue='A1A3' sortingBy={sortingBy} />
              <SortBy containerStyles='overflow-hidden' textValue='C3C4 GWP' sortByValue='C3C4' sortingBy={sortingBy} />
              <SortBy containerStyles='overflow-hidden' textValue='TOTAL GWP' sortByValue='TOTAL' sortingBy={sortingBy} />
            </div>
          </div>


          <Library searchParams={searchParams}/>

      </div>
    </main>
  )
}
