import React, { useEffect, useRef } from "react";
import "./Text.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as d3 from "d3";

function Text() {
    
    const chartRef = useRef();
  
    useEffect(() => {
      if (!chartRef.current.innerHTML) { // Check if the chart is already rendered
        // Dummy heart rate data
        const data = [70, 20, 20, 70, 50, 20, 100, 30, 80, 90, 20, 50];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Septr", "Oct", "Nov", "Dec"];
  
        const margin = { top: 20, right: 20, bottom: 50, left: 50 };
        const width = 400 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;
  
        const svg = d3.select(chartRef.current)
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
  
        const x = d3.scaleBand().domain(months).range([0, width]).padding(0.1);
        const y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
  
        const line = d3.line()
          .x((d, i) => x(months[i]))
          .y(d => y(d));
  
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1)
          .attr("d", line);
  
        svg.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));
  
        svg.append("g")
          .call(d3.axisLeft(y).tickValues(d3.range(0, 201, 20)));
      }
    }, []);
        
  
    return (
      <div className="text">
        <div className="text-design">
          <p className="h2">
            Patient's <br />Profile{" "}
            <br/>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Patient ID</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                
                >
                  <MenuItem value={10}>1</MenuItem>
                  <MenuItem value={20}>2</MenuItem>
                  <MenuItem value={30}>3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </p>
          <div className="PatienntReport">
            <hr />
            <div className="statsdata">
              <div className="dataview">
                <span id="data">1.2</span>
                <span>Blood Glucose</span>
              </div>
              <div className="dataview">
                <span id="data">Assymetrical</span>
                <span>ECG</span>
              </div>
              <div className="dataview">
                <span id="data">50.12</span>
                <span>Cholesterol</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="chart-container" ref={chartRef}></div>
      </div>
    );
  }
  
  export default Text;
