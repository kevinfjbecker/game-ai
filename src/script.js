
import * as d3 from 'd3'

import Map from './js/Map.js'
import Pathfinder from './js/Pathfinder.js'

import { generateGenomeView } from './js/GenomeView.js'
import { generateMapView } from './js/MapView.js'

///////////////////////////////////////////////////////////////////////////////

const map = new Map()

///////////////////////////////////////////////////////////////////////////////

const squareSide = 32
const boarderWidth = squareSide

///////////////////////////////////////////////////////////////////////////////

const mapSvgWidth = map.width * squareSide + boarderWidth * 2
const mapSvgHeight = map.height * squareSide + boarderWidth * 2
const mapSvg = d3.select('body').append('div')
    .append('svg')
        .attr('id', 'map-view')
        .attr('width', mapSvgWidth)
        .attr('height', mapSvgHeight)

const genomeSvgWidth = mapSvgWidth
const genomeSvgHeight = 3 * squareSide
const genomeSvg = d3.select('body').append('div')
    .append('svg')
        .attr('id', 'genome-view')
        .attr('width', genomeSvgWidth)
        .attr('height', genomeSvgHeight)

///////////////////////////////////////////////////////////////////////////////

const pathfinder = new Pathfinder()
window.pathfinder = pathfinder // debug

///////////////////////////////////////////////////////////////////////////////

generateMapView(mapSvg, map, squareSide, boarderWidth)
generateGenomeView(genomeSvg, pathfinder.genomes[0], pathfinder)
