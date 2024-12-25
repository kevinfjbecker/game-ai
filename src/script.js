import * as d3 from 'd3'
import Map from './js/Map.js'
import { generateMapView } from './js/MapView.js'

const map = new Map()

const squareSide = 32
const boarderWidth = squareSide

const svgWidth = map.width * squareSide + boarderWidth * 2
const svgHeight = map.height * squareSide + boarderWidth * 2

const svg = d3.select('body')
    .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
    
generateMapView(svg, map, squareSide, boarderWidth)