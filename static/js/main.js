'use strict';

$(function () {

    function clientsSlider() {
        var slides = $('.clients').children().length;

        if (slides > 3) {
            $('.clients').flickity({
                groupCells: 3,
                adaptiveHeight: true,
                setGallerySize: false,
                pageDots: false,
                freeScroll: true,
                contain: true,
                wrapAround: true
            });
        }
    }

    clientsSlider();
});
// $(function () {
//     var seedData = [{
//     "label": "18%",
//     "value": 18,
//     // "link": "https://facebook.github.io/react/"
//     }, {
//     "label": "35%",
//     "value": 35,
//     // "link": "https://redux.js.org/"
//     }, {
//     "label": "30%",
//     "value": 30,
//     // "link": "https://vuejs.org/"
//     }, {
//     "label": "17%",
//     "value": 17,
//     // "link": "https://meteorhacks.com/meteor-js-web-framework-for-everyone"
//     }];


//     // Define size & radius of donut pie chart
//     var width = 300,
//         height = 300,
//         radius = Math.min(width, height) / 2;

//     // Define arc colours
//     var colour = d3.scaleOrdinal(d3.schemeCategory20);

//     // Define arc ranges
//     var arcText = d3.scaleOrdinal()
//     .range([0, width]);

//     // Determine size of arcs
//     var arc = d3.arc()
//     .innerRadius(radius - 70)
//     .outerRadius(radius - 10);

//     // Create the donut pie chart layout
//     var pie = d3.pie()
//     .value(function (d) { return d["value"]; })
//     .sort(null);

//     // Append SVG attributes and append g to the SVG
//     var svg = d3.select("#donut-chart")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//         .attr("transform", "translate(" + radius + "," + radius + ")");

//     // Define inner circle
//     svg.append("circle")
//     .attr("cx", 0)
//     .attr("cy", 0)
//     .attr("r", 100)
//     .attr("fill", "#fff") ;

//     // Calculate SVG paths and fill in the colours
//     var g = svg.selectAll(".arc")
//     .data(pie(seedData))
//     .enter().append("g")
//     .attr("class", "arc")

//     // Append the path to each g
//     g.append("path")
//     .attr("d", arc)
//     .attr("fill", function(d, i) {
//         return colour(i);
//     });

//     // Append text labels to each arc
//     g.append("text")
//     .attr("transform", function(d) {
//         return "translate(" + arc.centroid(d) + ")";
//     })
//     .attr("dy", ".35em")
//     .style("text-anchor", "middle")
//     .attr("fill", "#fff")
//         .text(function(d,i) { return seedData[i].label; })

//     // Append text to the inner circle
//     svg.append("text")
//     .attr("dy", ".25em")
//     .style("text-anchor", "middle")
//     .attr("class", "inner-circle")
//     .attr("fill", "#36454f")
//     .text(function(d) { return '82%'; });

// });
"use strict";
'use strict';

$(function () {
    $('.header > .header__inner > *').clone().appendTo('.header__inner_sticky');

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.header__sticky').slideDown(100);
        } else {
            $('.header__sticky').slideUp(100);
        }
    });
});
'use strict';

$(function () {
    var progressList = $('.progress');

    progressList.each(function (index, el) {
        $(el).css('width', $(el).attr('data-percent'));
    });
});
'use strict';

$(function () {
    var counter = $('.tariffs__count-field');

    $('.tariffs__count-up').on('click', function () {
        var countVal = $(counter).val();

        $(counter).val(++countVal);
    });

    $('.tariffs__count-down').on('click', function () {
        var countVal = $(counter).val();

        if (+countVal === 0) return;

        $(counter).val(--countVal);
    });

    $(counter).on('change', function () {
        if ($(counter).val()) {
            $(counter).val(0);
        }
    });
});