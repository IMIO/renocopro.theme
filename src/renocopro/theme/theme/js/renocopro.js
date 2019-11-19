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

    function resize() {
      $('.flexslider-tile, .gallery-photo').each(function(){
        var limit = $(this).attr('data-slider');
        var gridSize = getGridSize(limit);

        $(this).children('.flexslider').each(function(){
          $(this).data('flexslider').vars.minItems = gridSize;
          $(this).data('flexslider').vars.maxItems = gridSize;
        });
      });
    }
  /* ----  SLIDER TILE GLOBAL END ---- */

  /* ----  FLEXSLIDER START ---- */
  $('.banner-slider').each(function(){
    var limit = $(this).attr('data-slider');
    $(this).children('.flexslider-slider').flexslider({
      animation: "slide",
      animationLoop: true,
      controlNav: true,
      slideshow: true,
      itemWidth: 210,
      itemMargin: 0,
      minItems: 1,
      maxItems: 1,
    });
  });
  $('.gallery-photo, .flexslider-tile').each(function(){
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
  $('.slider-multiple .flexslider').each(function(){
    var limit = $(this).attr('data-slider');
    $(this).flexslider({
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
  /* ----  FLEXSLIDER END ---- */

  /* ----  CASES STUDIES TEMPLATE START ---- */
  $("#case-studies-tabs").each(function(){
    var sections = $(this).find('#tabs-content section');
    var id = window.location.hash;
    var ids = []
    $(sections).map(function(index){
      $(this).attr('name', 'tab_' + index);
      title = $(this).children('h2.tab').text();
      li = document.createElement("li");
      li.innerHTML = title;
      li.id = 'tab_' + index;
      if (index == 0){
        $(this).addClass('current');
        li.className = 'current';
      }
      $('#tabs-buttons').append(li);
      ids.push("#tab_" + index);
    });

    var id = window.location.hash;
    if (id != '' && ids.includes(id)){
      $(id).addClass("current");
      $("li[id^='tab_']").removeClass("current");
      $("section[name^='tab_']").removeClass("current");
      $(id).addClass("current");
      $('[name="' + id.substring(1) + '"]').addClass("current");
    }else{
      $('#tab_0').addClass("current");
      $('[name="tab_0"]').addClass("current");
    }

    $("li[id^='tab_']").click(function() {
      $("li[id^='tab_']").removeClass("current");
      $("section[name^='tab_']").removeClass("current");
      $(this).addClass("current");
      var id = $(this).attr("id");
      history.pushState(null, null, "#" + id);
      $("[name='" + id + "']").addClass("current");
    });

    var button = document.getElementById('next');
    button.onclick = function () {
      var container = document.getElementById('tabs-buttons');
      sideScroll(container,'right',25,100,10);
    };

    var back = document.getElementById('prev');
    back.onclick = function () {
      var container = document.getElementById('tabs-buttons');
      sideScroll(container,'left',25,100,10);
    };

    function sideScroll(element,direction,speed,distance,step){
      scrollAmount = 0;
      var slideTimer = setInterval(function(){
        if(direction == 'left'){
          element.scrollLeft -= step;
        } else {
          element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
          window.clearInterval(slideTimer);
        }
      }, speed);
    }
  });
  /* ----  CASES STUDIES TEMPLATE END ---- */
});
