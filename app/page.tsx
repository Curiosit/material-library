import { MaterialCard, CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'

import { fetchCars, fetchMaterials } from '@/utils';

import Image from 'next/image'

export default async function Home({searchParams}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.materialType || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  
  });
  console.log("PARAMS ####################################################")
  console.log(searchParams.name)
  console.log(searchParams.type)
  const allMaterials = await fetchMaterials({
    name: searchParams.name || '',
    type: searchParams.type || '',
  });
  console.log("page materials");
  console.log(allMaterials);
  const isDataEmpty = !Array.isArray(allMaterials) || allMaterials.length < 1 || !allMaterials;
  


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

            {/* <div className='home__filter-container' >
              <CustomFilter title="origin" options={origin}/>
              <CustomFilter title="density" options={density}/>
            </div> */}
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
              <h2 className='text-black text-xl'>No materialss</h2>
              <p></p>
            </div>
          )}


      </div>
    </main>
  )
}
