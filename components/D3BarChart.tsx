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

const D3BarChart = ({ allMaterials }: any) => {





    const convertMaterialsToArray = (allMaterials: MaterialItem[]) => {
        const dataArray = allMaterials.map(item => ({
            name: item.name,
            value: parseFloat(item.TOTAL.toString()),
            unit: item.unit,
            arrayValue: [item.A1A3, item.C3, item.C4]
        }));

        return dataArray;
    };
    let stacked = 0;
    const toggleStacked = () => {
        if (stacked == 0) {
            stacked = 1
        } else {
            stacked = 0
        }

    }
    useEffect(() => {

        console.log("MATERIALS")
        console.log(allMaterials)
        const allMaterialsArray = convertMaterialsToArray(allMaterials);
        console.log(allMaterialsArray);
        const filteredData = allMaterialsArray;




        // TOOLTIP SETUP

        var mouseover = function (event: any, d: any) {
            //const node = d3.select(this.parentNode)
            tooltip
                .html("" + d.name + "<br>" + "GWP: " + d.value + "kgCO2/" + d.unit)
                .style("opacity", 1)
            d3.select(event.currentTarget).style("fill", "#27e693");
            console.log(d)
        }
        var mousemove = function (event: any, d: any) {
            tooltip
                .style('top', event.pageY + 'px')
                .style('left', (event.pageX + 10) + 'px')
            console.log(event.pageY)
        }
        var mouseleave = function (event: any, d: any) {
            tooltip
                .style("opacity", 0)
            d3.select(event.currentTarget).style("fill", "black");
        }

        //////////////////
        const margin = { top: 20, right: 20, bottom: 250, left: 70 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const x = d3.scaleBand().range([0, width]).padding(0.1);
        const y = d3.scaleLinear().range([height, 0]);

        const svg = d3
            .select(".bar-chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(
            filteredData.map(function (d: any) {
                return d.name;
            })
        );
        const maxValue = filteredData.length > 0 ? Math.max(...filteredData.map((material) => material.value)) : 0;
        y.domain([
            0,
            maxValue
        ]);

        function update() {


            /// BARS
            if (stacked) {
                svg
                    .selectAll(".bar")
                    .data(filteredData)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d: any) {
                        return x(d.name) as number;
                    })

                    .attr("width", x.bandwidth())


                    .attr("y", function (d: any) {
                        return y(0);
                    })
                    .attr("height", function (d) { return height - y(0); }) // always equal to 0
                    .on("mouseover", mouseover)
                    .on("mouseleave", mouseleave)
                    .on("mousemove", mousemove)
            }
            else {
                svg
                    .selectAll(".bar")
                    .data(filteredData)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d: any) {
                        return x(d.name) as number;
                    })

                    .attr("width", x.bandwidth())


                    .attr("y", function (d: any) {
                        return y(0);
                    })
                    .attr("height", function (d) { return height - y(0); }) // always equal to 0
                    .on("mouseover", mouseover)
                    .on("mouseleave", mouseleave)
                    .on("mousemove", mousemove)

            }
        }
        update();
        svg.append("g").call(d3.axisLeft(y));

        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text") // select all the text elements for styling
            .remove(); // remove previous labels

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

        // Animation
        svg.selectAll("rect")
            .transition()
            .duration(100)
            .attr("y", function (d: any) { return y(d.value); })
            .attr("height", function (d: any) { return height - y(d.value); })
            .delay(function (d, i) { console.log(i); return (i * 50) })


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


        // Three function that change the tooltip when user hover / move / leave a cell
        // https://d3-graph-gallery.com/graph/barplot_stacked_hover.html



    });






    return (<>

        <div className="bar-chart">


            <div id="my_dataviz"></div>

        </div>
        {/* <Link href="/dataviz/barchart/?limit=10" className="bg-primary-green hover:bg-transparent text-white hover:text-primary-green py-2 px-4 border border-primary-green rounded-full m-2">
            Limit to 10 records
        </Link> */}
    </>
    );
};

export default D3BarChart;


