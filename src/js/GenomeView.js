
import * as d3 from 'd3'
import {NORTH, SOUTH, EAST, WEST} from './defines.js'

const directionDegrees = [0, 180, 270, 90]

export const generateGenomeView = (svg, genome, pathfinder) =>
{
    console.log(pathfinder.decode(genome.bits))

    const width = svg.attr('width')
    const height = svg.attr('height')
    const borderWidth = 8
    const genomeWidth = (width - borderWidth * 2 )
    const bitWidth = genomeWidth / genome.bits.length
    const bitHeight = 21

    const genomeTop = height - bitHeight - borderWidth
    const genomeView = svg.append('g')
        .attr('transform', `translate(${borderWidth}, ${genomeTop})`)
        
    const directionsView = svg.append('g')
        .attr('transform', `translate(${borderWidth}, ${borderWidth})`)
    
    ///////////////////////////////////////////////////////////////////////////
        
    directionsView.selectAll('.direction-arrow')
        .data(pathfinder.decode(genome.bits))
        .join('g')
            .classed('direction-arrow', true)
            .attr('transform', (d, i) =>`translate(${i * bitWidth * 2 + bitWidth}, ${bitWidth})`)
        .append('g')
            .attr('transform', d => `rotate(${directionDegrees[d]})`)
        .append('path')
            .attr('d', getArrowUpPathData(bitWidth * 2))
            .style('stroke', 'green')
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round')
            .style('stroke-width', '2')
        .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', bitWidth * 2)
            .attr('height', bitWidth * 2)
            .style('fill', 'none')

    ///////////////////////////////////////////////////////////////////////////

    genomeView.selectAll('rect')
        .data(genome.bits)
        .join('rect')
        .classed('gene-bit', true)
        .attr('x', (d, i) => bitWidth * i)
        .attr('y', 0)
        .attr('width', bitWidth)
        .attr('height', bitHeight)
        .style('fill', (d) => d === 0 ? 'black' : 'white')
        .style('stroke', 'lightgrey')

    genomeView.append('rect')
        .classed('gene-focus-indicator', true)
        .attr('x', -1)
        .attr('y', -1)
        .attr('width', bitWidth * 2 + 2)
        .attr('height', bitHeight + 2)
        .style('fill', 'none')
        .style('stroke', 'steelblue')
}

const getArrowUpPathData = (squareSide) =>
{
    const center = squareSide * 0.5
    const step = squareSide * 0.4
    const edge = squareSide * 0.1
    return `m0 ${-step} ${step} ${step}m-${step}-${step}-${step} ${step}m${step}-${step}v${step * 2}`
}