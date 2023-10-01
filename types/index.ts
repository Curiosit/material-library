import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchParams {
    name?: string;
    type?: string;
    limit?: number;
    sortby?: string;
}

export interface SearchMaterialTypeProps {
    type: string;
    setType: (materialType: string) => void;
}
export interface FilterProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuel?: string;
  }

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders:number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;

}
export interface MaterialProps {
    
    name: string;
    nameen?: string;
    type: string;
    density?: number;
    uvalue?: number;
    carbon?: number;
    carbonperunit?: string;
    imgpath?: string;
    biogenic?: boolean;

}
export interface SearchParamsProps {
    searchParams: SearchParams;
  }
export interface EPDProps {
    
    name: string;
    nameen?: string;
    type?: string;
    A1A3?: number;
    C3?: number;
    C4?: number;
    D?: number;
    unit?: string;
    mass?: number;
    url?: string;
    TOTAL?: number;
    C3C4?: number;
}

export interface MaterialTable7Props {
    
    NAVN: string;
    A1A3: number;


}
export interface MaterialFilterProps {
    name?: string;
    type?: string;
    sortBy?:string;
  }
  export interface EPDFilterProps {
    name?: string;
    type?: string;
    limit?: number;
  }

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}