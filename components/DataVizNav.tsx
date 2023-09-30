import Link from "next/link"



function DataVizNav() {

    return (<>
        <Link href="/dataviz/barchart" className="bg-secondary-orange hover:bg-transparent text-white hover:text-secondary-orange py-2 px-4 border border-secondary-orange rounded-full m-2">
            <p className="logo_text">BarChart</p>
        </Link>
        <Link href="/dataviz/stackedbarchart" className="bg-secondary-orange hover:bg-transparent text-white hover:text-secondary-orange py-2 px-4 border border-secondary-orange rounded-full m-2">
            <p className="logo_text">Stacked BarChart</p>
        </Link>
        <Link href="/dataviz/scatterplot" className="bg-secondary-orange hover:bg-transparent text-white hover:text-secondary-orange py-2 px-4 border border-secondary-orange rounded-full m-2">
            <p className="logo_text">ScatterPlot</p>
        </Link>
    </>
    )
}

export default DataVizNav