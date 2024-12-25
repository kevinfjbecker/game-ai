export const generateMapView = (svg, map, squareSide, boarderWidth) =>
{
    const mapView = svg.append('g')
        .attr('transform', `translate(${boarderWidth}, ${boarderWidth})`)

    mapView.selectAll('rect')
        .data(map.map)
        .join('rect')
        .attr('x', (d, i) => squareSide * (i % map.width))
        .attr('y', (d, i) => squareSide * Math.floor(i / map.width))
        .attr('width', squareSide)
        .attr('height', squareSide)
        .style('fill', getColor)
        .style('stroke', 'lightgrey')
}

const getColor = d =>
{
    if(d === 5 || d === 8) return 'red'
    if(d === 1) return 'black'
    return 'white'
}

