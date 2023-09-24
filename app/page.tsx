

import { MaterialCard, CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import SortBy from '@/components/SortBy';
import { EPDProps, SearchParams } from '@/types';

import { fetchCars, fetchEPDs, fetchMaterials } from '@/utils';

import Image from 'next/image'
import { useState } from 'react';
interface SearchParamsProps {
  searchParams: SearchParams;
}
export default async function Home({searchParams}: SearchParamsProps) {
  
  const {name, type} = searchParams;
  //const [sortingBy, setSortingBy] = useState('')

  const fetchedMaterials =  await fetchEPDs({
    name: searchParams.name || '',
    type: searchParams.type || '',
    limit: searchParams.limit || 10,
  }); 
  console.log("sortBy");
  console.log(searchParams.sortby?.toUpperCase())
  
  const calculatedMaterials = calcMaterials(fetchedMaterials)
  console.log("calc materials");
  console.log(calculatedMaterials);
  const allMaterials = sortMaterials(calculatedMaterials)
  console.log("page materials");
  console.log(allMaterials);
  
  
  const isDataEmpty = !Array.isArray(allMaterials) || allMaterials.length < 1 || !allMaterials;
  const sortingBy = searchParams.sortby || '';

  function calcMaterials(arr: EPDProps[]): EPDProps[] {
    return arr.map((item) => {
      const C3C4 = (Number(item.C3) || 0) + (Number(item.C4) || 0);
      const TOTAL = (Number(item.A1A3)|| 0) + (Number(item.C3)|| 0) + (Number(item.C4)|| 0);
  
      return {
        ...item, // Copy existing properties
        C3C4, // Add the new 'C3C4' field
        TOTAL, // Add the new 'TOTAL' field
      };
    });
  }

  function sortMaterials<T>(arr: EPDProps[]): EPDProps[] {
    if(searchParams.sortby) {
      console.log(searchParams.sortby.toUpperCase())
      return sortByField(arr, searchParams.sortby.toUpperCase());
    }
    else {
     return sortByField(arr, "_id");
    }
  }
  
  function sortByField<T>(arr: T[], fieldName: string, ascending = true): T[] {
    const sortedArray = [...arr]; // Create a shallow copy of the original array
  
    sortedArray.sort((a, b) => {
      const aValue: any = (a as any)[fieldName];
      const bValue: any = (b as any)[fieldName];
  
      if (ascending) {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  
    return sortedArray;
  }
  
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">

        <div className='home__text-container'>
          <h1 className='text-4x1 font-extrabold'>Material Catalogue</h1>
          <p>Explore various building materials</p>
        </div>
          <div className="home__filters" id='discover'>
            <SearchBar />

            

            <div className="flex align-top">
              <SortBy containerStyles='overflow-hidden' textValue='A1A3 GWP' sortByValue='A1A3' sortingBy={sortingBy} />
              <SortBy containerStyles='overflow-hidden' textValue='C3C4 GWP' sortByValue='C3C4' sortingBy={sortingBy} />
              <SortBy containerStyles='overflow-hidden' textValue='TOTAL GWP' sortByValue='TOTAL' sortingBy={sortingBy} />
            </div>
          </div>


          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                
                {allMaterials?.map((material) => (
                <MaterialCard material={material}/>
                ))}
              </div>
              <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allMaterials.length}
            />
            </section>
          ):(
            <div className='home__error-container'>
              <h2 className='text-black text-xl'>No materials</h2>
              <p></p>
            </div>
          )}


      </div>
    </main>
  )
}
