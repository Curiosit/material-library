"use client"
import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { EPDProps } from "@/types";
import materials from "@/models/Material";
interface MaterialItem {
    name: string;
    TOTAL: number; // Assuming TOTAL is a numeric property
    // Add other properties if needed
}
interface DataItem {
    name: string;
    value: number | undefined; // or whatever the actual type is
}

const D3BarChart = ({ allMaterials }:any) => {
    console.log(materials)

    
    
      
    const convertMaterialsToArray = (allMaterials: MaterialItem[]) => {
        const dataArray = allMaterials.map(item => ({
          name: item.name,
          value: parseFloat(item.TOTAL.toString()),
        }));
      
        return dataArray;
    };
    useEffect(() => {
        console.log("MATERIALS")
        console.log(allMaterials)
        const allMaterialsArray = convertMaterialsToArray(allMaterials);
        console.log(allMaterialsArray);
        const filteredData = allMaterialsArray;

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
        y.domain([
            0,
            500,
        ]);

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
                return y(d.value);
            })
            .attr("height", function (d: any) {
                return height - y(d.value);
            });

        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g").call(d3.axisLeft(y));
    });

    return (
        <div className="bar-chart">
            {/* Additional JSX if needed */}


        </div>
    );
};

export default D3BarChart;


