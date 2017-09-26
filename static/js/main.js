'use strict';

$(function () {
    var video = document.querySelector('.banner__video');

    $('.pause').on('click', function () {
        $(this).toggleClass('pause_play');

        if (!video.paused) {
            video.pause();
        } else {
            video.play();
        }
    });
});
'use strict';

$(function () {
    $('.btn_q').hover(function () {
        var tip = '<div class="tip">' + $(this).attr('data-tip') + '</div>';
        var rect = this.getBoundingClientRect();
        $('body').append(tip);
        $('.tip').css('top', rect.top);
        $('.tip').css('left', rect.left + 40);
    }, function () {
        $('.tip').remove();
    });
});
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {

    function clientsSlider() {
        var slides = $('.clients').children().length;

        if (slides > 3) {
            $('.clients').flickity(_defineProperty({
                groupCells: 1,
                // adaptiveHeight: true,
                // setGallerySize: false,
                pageDots: false,
                // freeScroll: true,
                contain: true,
                wrapAround: true
            }, 'pageDots', true));
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

function sidebarHeight() {
    if ($(window).width() > 1000) {
        $('.sidebar').css('height', '');
        var height = $('.lk__main').outerHeight();
        $('.sidebar').css('height', height);
    } else {
        $('.sidebar').css('height', '');
    }
}

$(function () {
    $('.header > .header__inner > *').clone().appendTo('.header__inner_sticky');

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200 && $(window).width() > 1000) {
            $('.header__sticky').slideDown(100);
        } else {
            $('.header__sticky').slideUp(100);
        }

        if ($('#next').length !== 0) {
            var progressListNext = $('#next .progress');

            if ($(window).scrollTop() > $('#next')[0].offsetTop - 400) {
                if ($('#next .progress').hasClass('animation')) {} else {
                    $('#next .progress').addClass('animation');
                    progressListNext.each(function (index, el) {
                        $(el).css('width', $(el).attr('data-percent'));
                    });
                }
            } else if ($(window).scrollTop() < $('#next')[0].offsetTop) {
                $('#next .progress').removeClass('animation');
                progressListNext.each(function (index, el) {
                    $(el).css('width', '');
                });
            }

            if ($(window).scrollTop() > $('#next')[0].offsetTop + $('#next')[0].scrollHeight - 500) {
                $('#next .progress').removeClass('animation');
                progressListNext.each(function (index, el) {
                    $(el).css('width', '');
                });
            }
        }

        if ($('#economy').length !== 0) {
            var progressListEc = $('#economy .progress');

            if ($(window).scrollTop() > $('#economy')[0].offsetTop + 400) {
                if ($('#economy .progress').hasClass('animation')) {} else {
                    $('#economy .progress').addClass('animation');
                    progressListEc.each(function (index, el) {
                        $(el).css('width', $(el).attr('data-percent'));
                    });
                }
            } else if ($(window).scrollTop() < $('#economy')[0].offsetTop + 400) {
                $('#economy .progress').removeClass('animation');
                progressListEc.each(function (index, el) {
                    $(el).css('width', '');
                });
            }

            if ($(window).scrollTop() > $('#economy')[0].offsetTop + $('#economy')[0].scrollHeight - 500) {
                $('#economy .progress').removeClass('animation');
                progressListEc.each(function (index, el) {
                    $(el).css('width', '');
                });
            }
        }
    });

    $(window).on('resize', function () {
        if ($(window).width() <= 1000) {
            $('.header__sticky').hide();
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

    // var footerTxtEl = $('.section__text-white-bg');

    // $(footerTxtEl).each(function(i, el) {
    //     var footerTxt = $(el).html().split('<br>');
    //     $(el).html('');
    //     $(footerTxt).each(function(i, text) {
    //         var span = '<span>' + text + '</span><br>';

    //         $(el).append(span);

    //     })
    // })

});
'use strict';

$(function () {
    function sidebarHeight() {
        $('.sidebar').css('height', '');
        if ($(window).width() > 1000) {
            var height = $('.lk__main').outerHeight();
            $('.sidebar').css('height', height);
        }
    }

    sidebarHeight();
    $(window).on('resize', sidebarHeight);
});
'use strict';

$(function () {
    // lk-pay
    function nextStep(e) {
        e.preventDefault();
        var currentStep = $('.lk__step_active'),
            currentStepVal = $(currentStep).attr('data-step'),
            nextStep = $('[data-step="' + ++currentStepVal + '"]');
        $(currentStep).removeClass('lk__step_active');
        $(nextStep).addClass('lk__step_active');

        if ($('.level').css('display') === 'none') {
            $('.level').show();
        }

        if (currentStepVal === 1) {
            $('.level__step').first().addClass('level__step_active');
        } else {
            $('.level__step_active').removeClass('level__step_active').next().addClass('level__step_active');
        }
    }

    $('[data-action="next"]').on('click', nextStep);

    $('[data-action="finish"').on('click', function () {
        console.log('1');
        $.fancybox.open($('.modal_thanks'));
    });
});
'use strict';

$(function () {

    function profile() {
        $('[data-profile]').finish().hide();
        if ($('.rad_profile input').lenght !== 0) {
            var input = $('.rad_profile input').get(0);
            switch (input.checked) {
                case true:
                    $('[data-profile="1"]').fadeIn();
                    break;
                case false:
                    $('[data-profile="0"]').fadeIn();
                    break;
            }

            sidebarHeight();
        }
    }

    profile();
    $('.rad_profile').on('click', profile);
});
'use strict';

$(function () {
    $('.form__field-show').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('show-pass')) {
            $(this).removeClass('show-pass');
            $(this).prev().attr('type', 'password');
        } else {
            $(this).addClass('show-pass');
            $(this).prev().attr('type', 'text');
        }
    });
});
'use strict';

$(function () {
    $('.btn_menu').on('click', function () {
        $(this).next().fadeToggle(300);
    });

    $(window).on('scroll', function () {
        $('.menu').fadeOut(300);
    });

    function mobileMenu() {
        $('.menu .logotype').remove();
        if ($(window).width() <= 768) {
            $('.logotype:first').clone().prependTo('.menu');
            if ($('.menu-close').length === 0) {
                $('.menu').append('<button class="menu-close"></button>');
            }
        }
    }

    mobileMenu();
    $(window).on('resize', mobileMenu);

    $('.menu-close').on('click', function () {
        $('.btn_menu').trigger('click');
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
        $(this).next().fadeToggle();
        $(this).toggleClass('table__row_show');
        $(this).find('.table__toggle').toggleClass('table__toggle_show');
        sidebarHeight();
    });

    function toggle() {
        $(this).parent().toggleClass('toggle_open');
        $(this).next().finish().slideToggle();
    }

    $('.toggle__name').on('click', toggle);
});
'use strict';

$(function () {
    function tabWork() {
        $('.tabs__content').hide();
        var tab = $('.tabs__item-r:checked');
        $('.tabs__content[data-tab="' + $(tab).val() + '"]').show();
        sidebarHeight();
    }

    tabWork();
    $('.tabs__item').on('click', tabWork);
});
'use strict';

$(function () {
    function tariffsSlider() {
        if ($(window).width() <= 768) {
            $('.tariffs__lst').flickity({
                adaptiveHeight: true,
                prevNextButtons: false
            });
        } else {
            $('.tariffs__lst').flickity('destroy');
        }
    }

    tariffsSlider();
    $(window).on('resize', tariffsSlider);
});