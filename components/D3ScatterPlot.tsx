"use client"
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { EPDProps } from "@/types";
import materials from "@/models/Material";
import { CustomButton } from ".";
interface MaterialItem {
    name: string;
    TOTAL: number;
    unit: string;
    A1A3: number;
    C3: number;
    C4: number;
    C3C4?: number;
    type?: string;
    nameen?: string; // Assuming TOTAL is a numeric property
    // Add other properties if needed
}
interface DataItem {
    name: string;
    value: number | undefined; // or whatever the actual type is
    unit: string
    arrayValue?: number[]
}

const D3ScatterPlot = ({ allMaterials }: any) => {
    console.log(materials)




    const convertMaterialsToArray = (allMaterials: MaterialItem[]) => {
        const dataArray = allMaterials.map(item => (

            {

                name: item.name,
                valueX: parseFloat((item.A1A3.toString() == '-' ? 0 : item.A1A3).toString()),
                valueY: parseFloat(
                    ((item.C3.toString() == '-' ? 0 : parseFloat(item.C3.toString()))
                        + (item.C4.toString() == '-' ? 0 : parseFloat(item.C4.toString())))
                        .toString()),
                unit: item.unit,
                total: parseFloat((item.A1A3.toString() == '-' ? 0 : item.A1A3).toString()) + parseFloat(
                    ((item.C3.toString() == '-' ? 0 : parseFloat(item.C3.toString()))
                        + (item.C4.toString() == '-' ? 0 : parseFloat(item.C4.toString())))
                        .toString()),
                nameen: item.nameen

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
        //console.log(allMaterials)
        const allMaterialsArray = convertMaterialsToArray(allMaterials);
        console.log(allMaterialsArray);
        const filteredData = allMaterialsArray;




        // TOOLTIP SETUP

        var mouseover = function (event: any, d: any) {
            //const node = d3.select(this.parentNode)
            tooltip
                .html("" + d.name + "<br>" + d.nameen + "<br>"
                    + "A1A3: " + d.valueX + "kgCO2/" + d.unit + "<br>"
                    + "C3C4: " + d.valueY + "kgCO2/" + d.unit)
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
        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const width = 830 - margin.left - margin.right;
        const height = 760 - margin.top - margin.bottom;


        const svg = d3
            .select(".scatter-plot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
            .domain([-700, 900])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([-700, 800])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain([0, 1000])
            .range([2, 15]);


        /// SCATTER
        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.valueX); })
            .attr("cy", function (d) { return y(d.valueY); })
            .attr("r", function (d) { return z(d.total); })
            .style("fill", "#000000")
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave)
            .on("mousemove", mousemove)





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

        var XaxisLabelX = width / 2;
        var XaxisLabelY = height + 40;

        svg
            .append('g')
            .attr('transform', 'translate(' + XaxisLabelX + ', ' + XaxisLabelY + ')')
            .append('text')
            .attr('text-anchor', 'middle')
            .text('A1A3 kgCO2/ unit')
            ;
        var YaxisLabelX = -40;
        var YaxisLabelY = height / 2;
        svg
            .append('g')
            .attr('transform', 'translate(' + YaxisLabelX + ', ' + YaxisLabelY + ')')
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text('C3C4 kgCO2/ unit')
            ;



        let zoom = d3.zoom()
            .scaleExtent([0.25, 10])
            .on('zoom', handleZoom);
        function handleZoom(e: any) {
            d3.select('svg g')
                .attr('transform', e.transform);
        }
        function initZoom() {
            d3.select('svg')
                .call(zoom as any);
        }
        initZoom();
    })
    // Three function that change the tooltip when user hover / move / leave a cell
    // https://d3-graph-gallery.com/graph/barplot_stacked_hover.html










    return (
        <div className="scatter-plot">


            <div id="my_dataviz"></div>
        </div>

    );
};

export default D3ScatterPlot;


