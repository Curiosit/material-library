"use client"
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import Link from "next/link";
interface MaterialItem {
    name: string;
    TOTAL: number;
    unit: string;
    A1A3: number;
    C3: number;
    C4: number; // Assuming TOTAL is a numeric property
    // Add other properties if needed
}
interface DataItem {
    name: string;
    value: number | undefined; // or whatever the actual type is
    unit: string
    arrayValue?: number[]
}

const D3StackedBarChart = ({ allMaterials }: any) => {
    const convertMaterialsToArray = (allMaterials: MaterialItem[]) => {
        const dataArray = allMaterials.map(item => ({
            name: item.name,
            value: parseFloat(item.TOTAL.toString()),
            unit: item.unit,
            arrayValue: [item.A1A3, item.C3, item.C4],
            A1A3: item.A1A3,
            C3: item.C3,
            C4: item.C4
        }));
        return dataArray;
    };

    useEffect(() => {

        const allMaterialsArray = convertMaterialsToArray(allMaterials);
        const filteredData = allMaterialsArray;

        const subgroups = ['A1A3', 'C3', 'C4']
        const groups = filteredData.map(function (d: any) {
            return d.name;
        })

        var mouseover = function (this: any, event: any, d: any) {
            //const node = d3.select(this.parentNode)
            var subgroup = d3.select(this.parentNode)
            console.log(subgroup)
            var datum = subgroup.datum() as any
            console.log(datum.key)
            tooltip
                .html("" + d.data.name + "<br>" + datum.key + " " + (Math.abs(d[1]) - Math.abs(d[0])) + "kgCO2/" + d.data.unit)
                .style("opacity", 1)
            d3.select(event.currentTarget).style("opacity", 0.6);
            console.log(d)
        }
        var mousemove = function (event: any, d: any) {
            tooltip
                .style('top', event.pageY + 'px')
                .style('left', (event.pageX + 10) + 'px')
            console.log(d[0])
        }
        var mouseleave = function (event: any, d: any) {
            tooltip
                .style("opacity", 0)
            d3.select(event.currentTarget).style("opacity", 1);
        }
        var tooltip = d3.select("#my_dataviz")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("position", "absolute")
        /* .style("border-color", "#27e693") */

        //////////////////
        const margin = { top: 20, right: 20, bottom: 250, left: 70 };
        const width = 960 - margin.left - margin.right;
        const height = 1000 - margin.top - margin.bottom;


        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        //X
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding(0.2)
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));
        svg
            .call(d3.axisBottom(x))
            .selectAll("text") // select all the text elements for styling
            .remove();
        //Y
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([-700, 700])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));





        const stack: any = d3
            .stack()
            .keys(subgroups) // string[]
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetDiverging);

        var data = stack(filteredData);

        console.log(filteredData); // initial data array (as shown)
        console.log(data); // data array after stacking (as shown)


        var color = d3.scaleOrdinal() // D3 Version 4
            .range(["#27e693", "#f79761", "#2B59FF"]);

        var colors = ["#27e693", "#f79761", "#2B59FF"];





        svg.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("fill", function (d: any, i: any) { return colors[i]; })
            .selectAll("rect")
            .data(function (d: any) { return d; })
            .enter().append("rect")
            .attr("width", x.bandwidth)
            .attr("x", (d: any) => x(d.data.name) as number)
            .attr("y", function (d: any) { return y(d[1]); })
            .attr("height", function (d: any) { return y(d[0]) - y(d[1]); })
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
            .on("mousemove", mousemove)



        // remove previous labels

        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text") // select all the text elements for styling
            .attr("transform", "rotate(-65)") // rotate the text elements
            .style("text-anchor", "end");



            
        var YaxisLabelX = -40;
        var YaxisLabelY = height / 2;
        svg
            .append('g')
            .attr('transform', 'translate(' + YaxisLabelX + ', ' + YaxisLabelY + ')')
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text('GWP kgCO2/ unit')
            ;
        /* svg
            .append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(data)
            .enter()
            .append("g")
            .attr("fill", function (d: any) {
                return color(d.key);
            })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d): any {
                return d;
            })
            .enter()
            .append("rect")
            .attr("x", (d: any) => x(d.data.name) as number)
            .attr("y", function (d: any) {
                return y(d[1]);
            })
            .attr("height", function (d: any) {
                console.log(d)
                console.log(d[0])
                return y(d[0]) - y(d[1]);
            })
            .attr("width", x.bandwidth())
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
            .on("mousemove", mousemove)
 */



        // Three function that change the tooltip when user hover / move / leave a cell
        // https://d3-graph-gallery.com/graph/barplot_stacked_hover.html



        //LEGEND
        var SVG = d3.select("#my_dataviz3")
            .attr("width", 300)
            .attr("height", 100)
        // create a list of keys
        var keys = subgroups

        // Usually you have a color scale in your chart already


        // Add one dot in the legend for each name.
        var size = 20
        SVG.selectAll("mydots")
            .data(keys)
            .enter()
            .append("rect")
            .attr("x", 10)
            .attr("y", function (d, i) { return 10 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function (d: any, i: any) { return colors[i] })

        // Add one dot in the legend for each name.
        SVG.selectAll("mylabels")
            .data(keys)
            .enter()
            .append("text")
            .attr("x", 10 + size * 1.2)
            .attr("y", function (d, i) { return 10 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d: any, i: any) { return colors[i] })
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")



    });






    return (<>
        <svg id="my_dataviz3" height="300" width="450"></svg>
        <div className="bar-chart">


            <div id="my_dataviz"></div>

        </div>



    </>
    );
};

export default D3StackedBarChart;


