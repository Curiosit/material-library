

import { MaterialCard, CustomFilter, Hero, SearchBar, ShowMore, DataVizNav } from '@/components'
import D3BarChart from '@/components/D3BarChart';
import DataViz from '@/components/DataViz';
import Library from '@/components/Library';
import SortBy from '@/components/SortBy';
import { EPDProps, SearchParams, SearchParamsProps } from '@/types';

import { fetchCars, fetchEPDs, fetchMaterials } from '@/utils';

import Image from 'next/image'
import { useState } from 'react';

export default async function StackedBarChartPage({searchParams}: SearchParamsProps) {
  
  const sortingBy = searchParams.sortby || '';





return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover">

        <div className='home__text-container'>
           {/* <h1 className='text-4x1 font-extrabold'>Material Data Visualization</h1> */} 
          
        </div>
        <div className="home__filters" id='discover'>
            
          <div className="flex align-top">
          <DataVizNav />
          </div>
        
        </div>

        <DataViz chartType={'stackedbarchart'} searchParams={searchParams} />
         

      </div>
    </main>
  )
}