
const DATA_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json'
const WIDTH = 700;
const HEIGHT = 500;
const MARGIN = 5
const LEFT_MARGIN = 50
const BOTTOM_MARGIN = 100
const RIGHT_MARGIN = 100
const RADIUS = 5

const main = _ => {


    d3.json(DATA_URL, data => {

        const { Seconds: FASTEST } = data[0]
        const { Seconds: SLOWEST } = data[data.length - 1]

        const formatCyclist = json =>
            `${json.Name}: ${json.Nationality}\nYear: ${ json.Year } Time: ${ json.Time }\n${ json.Doping }`

        const secondsScale = d3.scaleLinear()
            .domain([SLOWEST, FASTEST])
            .range([0 + LEFT_MARGIN, WIDTH - RIGHT_MARGIN])

        const secondsRuler = d3.scaleLinear()
            .domain([SLOWEST - FASTEST, 0])
            .range([0 + LEFT_MARGIN, WIDTH - RIGHT_MARGIN])

        const placeScale = d3.scaleLinear()
           .domain([0, data.length])
           .range([0 + MARGIN, HEIGHT - BOTTOM_MARGIN])

        const placeRuler = d3.scaleLinear()
           .domain([1, data.length])
           .range([1 + MARGIN, HEIGHT - BOTTOM_MARGIN])

        const graph = d3.select('#graph')
            .append('svg')
            .attr('width', WIDTH)
            .attr('height', HEIGHT)

        const circles = graph.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')

        const circleAttr = circles.attr('r', RADIUS)
            .attr('cx', ({ Seconds }) => secondsScale(Seconds))
            .attr('cy', ({ Place }) => placeScale(Place))
            .attr('class', ({ Doping }) => Doping ? 'doping' : 'notDoping')
            .append('title')
            .text(formatCyclist)

        const text = graph.selectAll('text')
            .data(data)
            .enter()
            .append('text')

        const textLabes = text
            .attr('x', ({ Seconds  }) => secondsScale(Seconds) + RADIUS + 2)
            .attr('y', ({ Place }) => placeScale(Place) + RADIUS - 1)
            .text(({ Name }) => Name)
            .attr('class', 'cyclistName')
            .append('title')
            .text(formatCyclist)

        const xAxis = d3
            .axisBottom()
            .scale(secondsRuler)

        graph
            .append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0, ${HEIGHT - BOTTOM_MARGIN + MARGIN + 2})`)
            .call(xAxis)

        const yAxis = d3
            .axisLeft()
            .scale(placeRuler)
            .tickValues([1,5,10,15,20,25,30,35])

        graph
            .append('g')
            .attr('class', 'yAxis')
            .attr('transform', `translate(${LEFT_MARGIN - MARGIN - 2}, 0)`)
            .call(yAxis)
    })
}

document.addEventListener('DOMContentLoaded', main)

