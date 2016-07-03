'use strict';

var DATA_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
var WIDTH = 700;
var HEIGHT = 500;
var MARGIN = 5;
var LEFT_MARGIN = 50;
var BOTTOM_MARGIN = 100;
var RIGHT_MARGIN = 100;
var RADIUS = 5;

var main = function main(_) {

    d3.json(DATA_URL, function (data) {
        var FASTEST = data[0].Seconds;
        var SLOWEST = data[data.length - 1].Seconds;


        var formatCyclist = function formatCyclist(json) {
            return json.Name + ': ' + json.Nationality + '\nYear: ' + json.Year + ' Time: ' + json.Time + '\n' + json.Doping;
        };

        var secondsScale = d3.scaleLinear().domain([SLOWEST, FASTEST]).range([0 + LEFT_MARGIN, WIDTH - RIGHT_MARGIN]);

        var secondsRuler = d3.scaleLinear().domain([SLOWEST - FASTEST, 0]).range([0 + LEFT_MARGIN, WIDTH - RIGHT_MARGIN]);

        var placeScale = d3.scaleLinear().domain([0, data.length]).range([0 + MARGIN, HEIGHT - BOTTOM_MARGIN]);

        var placeRuler = d3.scaleLinear().domain([1, data.length]).range([1 + MARGIN, HEIGHT - BOTTOM_MARGIN]);

        var graph = d3.select('#graph').append('svg').attr('width', WIDTH).attr('height', HEIGHT);

        var circles = graph.selectAll('circle').data(data).enter().append('circle');

        var circleAttr = circles.attr('r', RADIUS).attr('cx', function (_ref) {
            var Seconds = _ref.Seconds;
            return secondsScale(Seconds);
        }).attr('cy', function (_ref2) {
            var Place = _ref2.Place;
            return placeScale(Place);
        }).attr('class', function (_ref3) {
            var Doping = _ref3.Doping;
            return Doping ? 'doping' : 'notDoping';
        }).append('title').text(formatCyclist);

        var text = graph.selectAll('text').data(data).enter().append('text');

        var textLabes = text.attr('x', function (_ref4) {
            var Seconds = _ref4.Seconds;
            return secondsScale(Seconds) + RADIUS + 2;
        }).attr('y', function (_ref5) {
            var Place = _ref5.Place;
            return placeScale(Place) + RADIUS - 1;
        }).text(function (_ref6) {
            var Name = _ref6.Name;
            return Name;
        }).attr('class', 'cyclistName').append('title').text(formatCyclist);

        var xAxis = d3.axisBottom().scale(secondsRuler);

        graph.append('g').attr('class', 'xAxis').attr('transform', 'translate(0, ' + (HEIGHT - BOTTOM_MARGIN + MARGIN + 2) + ')').call(xAxis);

        var yAxis = d3.axisLeft().scale(placeRuler).tickValues([1, 5, 10, 15, 20, 25, 30, 35]);

        graph.append('g').attr('class', 'yAxis').attr('transform', 'translate(' + (LEFT_MARGIN - MARGIN - 2) + ', 0)').call(yAxis);
    });
};

document.addEventListener('DOMContentLoaded', main);

