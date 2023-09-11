import { CarProps, FilterProps, MaterialFilterProps, EPDFilterProps } from "@/types";
import { connectToDB } from "./database";

import { materialTypes } from "@/constants";
import materials from "@/models/Material";
import epd from "@/models/EPD";

export async function fetchCars(filters: FilterProps) {
    const headers = {
		'X-RapidAPI-Key': '671e74eb6emsh38c5f9858116365p1a70e4jsn277db97e13d6',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
  const { manufacturer, year, model, limit, fuel } = filters;
    const response = await fetch (`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {headers: headers});
    const result = await response.json();
    return result;
}
export async function fetchMaterials(filters: MaterialFilterProps) {
  
    const { name, type } = filters;
    const db = await connectToDB();
    const keyword = name;
    
    let allmaterials = [];
    console.log("FETCH ###############");
    console.log(name);
    if(type) {
      if(name) {
        console.log("1")
        allmaterials = await materials.find({name: {'$regex': name, '$options': 'i'}, type: {'$regex': type, '$options': 'i'}})
      }
      else {
        console.log("2")
        allmaterials = await materials.find({type: {'$regex': type, '$options': 'i'}})
      }
      
    } else {
      if(name) {
        console.log("3")
        allmaterials = await materials.find({name: {'$regex': name, '$options': 'i'}})
      }
      else {
        console.log("4")
        allmaterials = await materials.find({});
      }
      
      
    }
    
    
    //const allmaterials = await materials.find({});
    console.log("materials");
    console.log(allmaterials);

    return allmaterials;
   
}
export async function fetchEPDs(filters: EPDFilterProps) {
  
  const { name, type } = filters;
  const db = await connectToDB();
  const keyword = name;
  
  let allmaterials:any = [];
  console.log("FETCH ###############");
  console.log(name);
/*   if(type) {
    if(name) {
      console.log("1")
      allmaterials = await materials.find({name: {'$regex': name, '$options': 'i'}, type: {'$regex': type, '$options': 'i'}})
    }
    else {
      console.log("2")
      allmaterials = await materials.find({type: {'$regex': type, '$options': 'i'}})
    }
    
  } else {
    if(name) {
      console.log("3")
      allmaterials = await materials.find({name: {'$regex': name, '$options': 'i'}})
    }
    else {
      console.log("4")
      allmaterials = await materials.find({});
    }
    
    
  } */
  
  allmaterials = await epd.find({});
  //const allmaterials = await materials.find({});
  
  console.log("materials");
  console.log(allmaterials);

  return allmaterials;
 
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

  export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 

  export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
      
      
    searchParams.set(type, value);
      

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname;
  }


  