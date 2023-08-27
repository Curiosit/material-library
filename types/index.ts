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
    type: string;
    density?: number;
    uvalue?: number;
    carbon?: number;
    carbonperunit?: string;
    imgpath?: string;
    biogenic?: boolean;

}
export interface MaterialFilterProps {
    name?: string;
    type?: string;
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