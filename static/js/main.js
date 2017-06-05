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
"use strict";

$(function () {
    var seedData = [{
        "label": "18%",
        "value": 18,
        "dx": "125",
        "dy": "-125",
        "fill": "#0fd1ff"
    }, {
        "label": "35%",
        "value": 35,
        "dx": "125",
        "dy": "125",
        "fill": "url(#arc-2)"
    }, {
        "label": "30%",
        "value": 30,
        "dx": "-125",
        "dy": "125",
        "fill": "#525252"
    }, {
        "label": "17%",
        "value": 17,
        "dx": "-125",
        "dy": "-125",
        "fill": "url(#arc-1)"
    }];

    var circle = $('.circle'),
        legend = $('.legend');

    // Define size & radius of donut pie chart
    var width = 360,
        height = 360,
        radius = 150,
        center = Math.min(width, height) / 2;

    // Define arc ranges
    var arcText = d3.scaleOrdinal().range([0, width]);

    // Determine size of arcs
    var arc = d3.arc().innerRadius(radius - 60).outerRadius(radius - 10);

    var arcLarge = d3.arc().innerRadius(radius + 8).outerRadius(radius - 60);

    // Create the donut pie chart layout
    var pie = d3.pie().value(function (d) {
        return d["value"];
    }).sort(null);

    // Append SVG attributes and append g to the SVG
    var svg = d3.select("#donut-chart").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + center + "," + center + ")");

    var defs = svg.append('svg:defs');

    defs.append("svg:pattern").attr("id", "arc-1").attr("width", "22").attr("height", "22").attr("patternUnits", "userSpaceOnUse").append("svg:image").attr("xlink:href", 'static/img/assets/economy/arc-1.png').attr("width", "22").attr("height", "22").attr("x", 0).attr("y", 0);

    defs.append("svg:pattern").attr("id", "arc-2").attr("width", "19").attr("height", "19").attr("patternUnits", "userSpaceOnUse").append("svg:image").attr("xlink:href", 'static/img/assets/economy/arc-2.png').attr("width", "19").attr("height", "19").attr("x", 0).attr("y", 0);

    // Define inner circle
    svg.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 100).attr("fill", "#fff");

    // Calculate SVG paths and fill in the colours
    var g = svg.selectAll(".arc").data(pie(seedData)).enter().append("g").attr("class", "arc");

    // Append the path to each g
    g.append("path").attr("d", arc).attr("fill", function (i) {
        return i.data.fill;
    }).on("mouseover", function (d, path) {
        var index = d.index;
        if (this) {
            path = this;
        }
        $(legend).find('[data-index="' + index + '"]').addClass('select');
        d3.select(path).transition().duration(250).attr("d", arcLarge);
    }).on("mouseout", function (d, path) {
        if (this) {
            path = this;
        }
        $(legend).find('.select').removeClass('select');
        d3.select(path).transition().duration(250).attr("d", arc);
    });

    // Append text labels to each arc
    g.append("text").attr("dy", function (i) {
        return i.data.dy;
    }).attr("dx", function (i) {
        return i.data.dx;
    }).style("text-anchor", "middle").style("font-size", "18px").attr("fill", "#000").text(function (d, i) {
        return seedData[i].label;
    });

    // Append text to the inner circle
    svg.append("text").attr("dy", ".25em").style("text-anchor", "middle").attr("class", "inner-circle").attr("fill", "#36454f").text(function (d) {
        return '82%';
    });

    // Legend

    $('.legend__point').on('mouseover', function () {
        var index = $(this).data('index');
        $(this).addClass('select');
        g['_groups'][0].forEach(function (el, i) {
            if (i === index) {
                var path = $(el).find('path')[0];
                d3.select(el).select("path").on("mouseover")(el['__data__'], path);
            }
        });
    });

    $('.legend__point').on('mouseout', function () {
        $(this).removeClass('select');
        var index = $(this).data('index');
        $(this).addClass('select');
        g['_groups'][0].forEach(function (el, i) {
            if (i === index) {
                var path = $(el).find('path')[0];
                d3.select(el).select("path").on("mouseout")(el['__data__'], path);
            }
        });
    });
});
'use strict';

$(function () {
    $('.header > .header__inner > *').clone().appendTo('.header__inner_sticky');
    var progressList = $('.progress');

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.header__sticky').slideDown(100);
        } else {
            $('.header__sticky').slideUp(100);
        }

        if ($('#next').length !== 0) {
            if ($(window).scrollTop() > $('#next')[0].offsetTop - 400) {
                if ($('#next .progress').hasClass('animation')) {} else {
                    $('#next .progress').addClass('animation');
                    progressList.each(function (index, el) {
                        $(el).css('width', $(el).attr('data-percent'));
                    });
                }
            } else if ($(window).scrollTop() < $('#next')[0].offsetTop) {
                $('#next .progress').removeClass('animation');
                progressList.each(function (index, el) {
                    $(el).css('width', '');
                });
            }

            if ($(window).scrollTop() > $('#next')[0].offsetTop + $('#next')[0].scrollHeight - 500) {
                $('#next .progress').removeClass('animation');
                progressList.each(function (index, el) {
                    $(el).css('width', '');
                });
            }
        }
    });

    $(document).on('click', 'a[href^="#"]', function (e) {

        var id = $(this).attr('href');

        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();

        var pos = $id.offset().top;

        $('body, html').animate({ scrollTop: pos }, 1000);
    });
});
'use strict';

$(function () {
    var height = $('.lk__main').outerHeight();
    $('.sidebar').css('height', height);
});
'use strict';

$(function () {
    function nextStep() {
        var currentStep = $('.lk__step_active'),
            currentStepVal = $(currentStep).attr('data-step'),
            nextStep = $('[data-step="' + ++currentStepVal + '"]');
        $(currentStep).removeClass('lk__step_active');
        $(nextStep).addClass('lk__step_active');
        if ($('.level').css('display') === 'none') {
            $('.level').show();
        }
    }

    $('[data-action="next"]').on('click', nextStep);
});
'use strict';

$(function () {
    $('.btn_menu').on('click', function () {
        $(this).next().fadeToggle(300);
    });

    $(window).on('scroll', function () {
        $('.menu').fadeOut(300);
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
    function sidebarHeight() {
        $('.sidebar').css('height', '');
        var height = $('.lk__main').outerHeight();
        $('.sidebar').css('height', height);
    }

    $('.table__row_more').on('click', function () {
        $(this).next().toggle();
        $(this).toggleClass('table__row_show');
        $(this).find('.table__toggle').toggleClass('table__toggle_show');
        sidebarHeight();
    });
});
'use strict';

$(function () {
    function tabWork() {
        $('.tabs__content').hide();
        var tab = $('.tabs__item-r:checked');
        $('.tabs__content[data-tab="' + $(tab).val() + '"]').show();
    }

    tabWork();
    $('.tabs__item').on('click', tabWork);
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