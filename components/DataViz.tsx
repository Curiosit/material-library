import { EPDProps, SearchParams, SearchParamsProps } from "@/types"
import { MaterialCard, ShowMore } from "."
import { fetchEPDs } from "@/utils";
import D3BarChart from "./D3BarChart";
import D3ScatterPlot from "./D3ScatterPlot";
import D3StackedBarChart from "./D3StackedBarChart";

export interface DataVizProps {
    chartType: String;
    searchParams: SearchParams;
}
async function DataViz({ chartType, searchParams }: DataVizProps) {
    console.log(chartType);
    console.log("CHARTTYPE")
    const { name, type } = searchParams;
    //const [sortingBy, setSortingBy] = useState('')

    const fetchedMaterials = await fetchEPDs({
        name: searchParams.name || '',
        type: searchParams.type || '',
        limit: searchParams.limit || 100,
    });
    const calculatedMaterials = calcMaterials(fetchedMaterials)
    const allMaterials = sortMaterials(calculatedMaterials)
    const isDataEmpty = !Array.isArray(allMaterials) || allMaterials.length < 1 || !allMaterials;


    function calcMaterials(arr: EPDProps[]): EPDProps[] {
        return arr.map((item) => {
            const C3C4 = (Number(item.C3) || 0) + (Number(item.C4) || 0);
            const TOTAL = (Number(item.A1A3) || 0) + (Number(item.C3) || 0) + (Number(item.C4) || 0);

            return {
                ...item, // Copy existing properties
                C3C4, // Add the new 'C3C4' field
                TOTAL, // Add the new 'TOTAL' field
            };
        });
    }

    function sortMaterials<T>(arr: EPDProps[]): EPDProps[] {
        if (searchParams.sortby) {
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
    function renderSwitch(param: String) {
        switch(param) {
          case 'scatterplot':
            return <D3ScatterPlot allMaterials={allMaterials} />;
        case 'stackedbarchart':
            return <D3StackedBarChart allMaterials={allMaterials} />;
          default:
            return <D3BarChart allMaterials={allMaterials} />;
        }
      }
    console.log("DATA VIZ")
    console.log(allMaterials)
    console.log("PATHNAME")
    console.log(chartType)
    return (
        <div>
            
            {renderSwitch(chartType)}
        </div>
    )

}

export default DataViz