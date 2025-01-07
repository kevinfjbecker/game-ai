
import { NORTH, SOUTH, EAST, WEST } from './defines.js'

const directionDegrees = { }
directionDegrees[NORTH] = 0
directionDegrees[SOUTH] = 180
directionDegrees[EAST] = 270
directionDegrees[WEST] = 90

export const generateGenomeView = (svg, genome, pathfinder) =>
{
    console.log(pathfinder.decode(genome.bits))

    const width = svg.attr('width')
    const height = svg.attr('height')
    const margin = 12
    const padding = 12
    const genomeWidth = (width - margin * 2 )
    const bitWidth = genomeWidth / genome.bits.length
    const geneWidth = bitWidth * 2

    const bitHeight = 21
    const fontSize = bitHeight

    const genomeTop = margin + geneWidth + padding
    const decodeTop = genomeTop + bitHeight + padding

    const directionsView = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`)
        
    const genomeView = svg.append('g')
        .attr('transform', `translate(${margin}, ${genomeTop})`)
        
    const decodeView = svg.append('g')
        .attr('transform', `translate(${margin}, ${decodeTop})`)
    
    ///////////////////////////////////////////////////////////////////////////
        
    directionsView.selectAll('.direction-arrow')
        .data(pathfinder.decode(genome.bits))
        .join('g')
            .classed('direction-arrow', true)
            .attr('transform', (d, i) =>`translate(${i * geneWidth + bitWidth}, ${bitWidth})`)
        .append('g')
            .attr('transform', d => `rotate(${directionDegrees[d]})`)
        .append('path')
            .attr('d', getArrowUpPathData(geneWidth))
            .style('stroke', 'green')
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round')
            .style('stroke-width', '2')
        .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', geneWidth)
            .attr('height', geneWidth)
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
        .style('fill', (d) => d === 1 ? 'black' : 'white')
        .style('stroke', 'lightgrey')

    genomeView.append('rect')
        .classed('gene-focus-indicator', true)
        .attr('x', -1)
        .attr('y', -1)
        .attr('width', geneWidth + 2)
        .attr('height', bitHeight + 2)
        .style('fill', 'none')
        .style('stroke', 'steelblue')

    ///////////////////////////////////////////////////////////////////////////

    decodeView.selectAll('text')
        .data(pathfinder.decode(genome.bits))
        .join('text')
        .text(d => d)
        .attr('x', (d, i) => i * geneWidth + 2)
        .attr('y', fontSize /2)
        .style('font-size', fontSize)
        .style('fill', (d) => 'green')
}

const getArrowUpPathData = (squareSide) =>
{
    const center = squareSide * 0.5
    const step = squareSide * 0.4
    const edge = squareSide * 0.1
    return `m0 ${-step} ${step} ${step}m-${step}-${step}-${step} ${step}m${step}-${step}v${step * 2}`
}