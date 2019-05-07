/*
 * ideabox_spirit.js
 * Copyright (C) 2017 AuroreMariscal <aurore@affinitic.be>
 *
 * Distributed under terms of the LICENCE.txt license.
 */

$(document).ready(function() {

  /* ----  SLIDER TILE GLOBAL START ---- */
    var $window = $(window)
    var flexslider = { vars:{} }

    function getGridSize(limit) {
        var number = limit;
        if (window.innerWidth < 900){
            number = 3
        }
        if (window.innerWidth < 600){
            number = 2
        }
        if (window.innerWidth < 480){
            number = 1
        }
        return number
    }

    $window.resize(function() {
        resize();
    });
  /* ----  SLIDER TILE GLOBAL END ---- */

  /* ----  CASES STUDIES TILE START ---- */
    $('.flexslider-tile').each(function(){
      var limit = $(this).attr('data-slider');
      $(this).children('.flexslider-slider').flexslider({
        animation: "slide",
        animationLoop: false,
        controlNav: false,
        slideshow: false,
        itemWidth: 210,
        itemMargin: 10,
        minItems: getGridSize(limit),
        maxItems: getGridSize(limit),
      });
    });

    function resize() {
      $('.flexslider-tile').each(function(){
        var limit = $(this).attr('data-slider');
        var gridSize = getGridSize(limit);

        $(this).children('.flexslider').data('flexslider').vars.minItems = gridSize;
        $(this).children('.flexslider').data('flexslider').vars.maxItems = gridSize;
      });
    }
  /* ----  CASES STUDIES TILE END ---- */
});
