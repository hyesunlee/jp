$(document).ready(function(){
	if($(".searchWrap").length){topFixbar(".searchWrap");}//탑예약존이 있을때만 실행
	//if($(".faqList ").length){accodian(".faqList");} //qna
	/* ie9 이하에서 select 디자인처리 */
	$(".lte9 .searchWrapInner select").each(function(){
		$(this).after("<span class='selecttext'></span>");
	});
	$(".lte9 .searchWrapInner select").each(function(){
		var val = $(this).children("option:selected").text();
		$(this).next(".selecttext").text(val);
		$(this).change(function(){
			var val = $(this).children("option:selected").text();
			$(this).next(".selecttext").text(val);
		});
	});
	$(".lte9 .selectWrap select").each(function(){
		$(this).after("<span class='selecttext'></span>");
	});
	$(".lte9 .selectWrap select").each(function(){
		var val = $(this).children("option:selected").text();
		$(this).next(".selecttext").text(val);
		$(this).change(function(){
			var val = $(this).children("option:selected").text();
			$(this).next(".selecttext").text(val);
		});
	});
	modalSlider();
});

/* tab Menu */
$.fn.tab = function(options) {
	var hash = window.location.hash.slice(1).split('tab0')[1];
	var that = $(this);
	options = $.extend({}, $.fn.tab.options, options);
	function init() {
		that.find(options.navs).on('click', show);
	}
	function show(e) {
		if(e) {
			e.preventDefault();
		}
		that.find("a").removeClass(options.current);
		$(this).addClass(options.current);

		$(this.hash).addClass(options.contents)
			.siblings().removeClass(options.contents);


	}
	this.go = function(index) {
		var newIdx = index;
		if(hash){
			newIdx = (parseInt(hash) - 1);
			scroll();
		}else{
			return
		}
		that.find(options.navs).eq(newIdx).trigger('click');
	};
	function scroll() {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
	}
	init();
	return this.each(function () {
		var elem = $(this);
	});
};
$.fn.tab.options = {
	navs:'> a', 
	contents:'active',
	current:'on'
};

$('a.layerPop_close').live('click', function() {
	var target = $(this);
	close(target);
	return false;
});

$('a.popup_close').live('click', function() {
	var target = $(this);
	close(target);
	return false;
});
$('#fade').live('click', function() {
	$('#fade, .layerpop').fadeOut(function() {
		$('#fade').remove();
	});
});

var close = function(target){
	var _this = target;
	var layer = _this.closest(".layerpop");
	if($('.layerpop:visible').length <= 1){
		$('#fade').add(layer).fadeOut(function() {
			$('#fade').remove();
		});
	}else{
		$(layer).fadeOut();
	}
}
var modal = function(popID){
	var browser_height = $(window).height();
	var cont_width = $('#' + popID).outerWidth();
	var cont_height =$('#' + popID).outerHeight();
	var margin_top = Math.floor(cont_height /2) * (-1) + 'px';
	var margin_left = Math.floor(cont_width /2) * (-1) + 'px';
	//var top = $(window).scrollTop() + (browser_height /2);
	var top = '50%';
	var left = '50%';

	$('#' + popID).fadeIn().css({ 'width': Number( cont_width ) });
	$('#' + popID).css({
		'top' : top,
		'left': left,
		'margin-top' : margin_top,
		'margin-left' : margin_left
	});
	$('#fade:last').remove();
	$('body').append('<div id="fade"></div>');
	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();


}

/*var modalSlider = function(slider){
	var config = {
		infiniteLoop:false,
		hideControlOnEnd:false,
		pagerCustom: '.pager',
		controls:false
	};
	sliders = $(slider).bxSlider(config);

	$('a.btn_prev').click(function () {
		var current = sliders.getCurrentSlide();
		sliders.goToPrevSlide(current) - 1;
	});
	$('a.btn_next').click(function () {
		var current = sliders.getCurrentSlide();
		sliders.goToNextSlide(current) + 1;
	});

}*/

// ROLLING



var modalSlider = function(slider){
	var visibleThumbs = $("#bx-pager > li > a").length;

	var LargeSlider=$(".viewSlider").bxSlider({
		speed:500,
		infiniteLoop:true,
		controls: false
	});
	var ThumbSlider=$('#bx-pager').bxSlider({
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 132,
		slideMargin: 10,
		moveSlides: 1,
		pager:false,
		infiniteLoop:true,
		speed:500,
		controls: false,
		onSlideBefore:function($slideElement, oldIndex, newIndex){
			$("#bx-pager").find(".active").removeClass("active");
			$slideElement.find("a").addClass("active");
		}
	});

	$('#bx-pager').on('click','a',function () {
		//LargeSlider.goToSlide(newIndex);
		slideThumbs(this)
		return false;
	});

	function slideThumbs(that) {
		var newIndex = Math.floor($(that).attr("data-slide-index"));
		ThumbSlider.goToSlide(newIndex)
		LargeSlider.goToSlide(newIndex)
	}
	
	$('a.btn_prev').click(function () {
		var current = ThumbSlider.getCurrentSlide();
		LargeSlider.goToPrevSlide(current) - 1;
		ThumbSlider.goToPrevSlide(current) - 1;
	});
	$('a.btn_next').click(function () {
		var current = ThumbSlider.getCurrentSlide();
		LargeSlider.goToNextSlide(current) + 1;
		ThumbSlider.goToNextSlide(current) + 1;
	});
}


/* 상단 fixed */
var topFixbar = function(obj){
	var $obj = $(obj)
		, ani = false
		, timer = null
		, headerHeight = $("#header").height() + $(".top_resWrap").height();


	function checkOffset(){
		if (headerHeight < $(window).scrollTop()) {
			if(!ani){
				ani = true;
				$("body").addClass("fixed");
				$obj.addClass("fixed");
			}
		} else {
			if(ani){
				ani = false;
				$("body").removeClass("fixed");
				$obj.removeClass("fixed");
			}
		}
	}
	$(window).unbind("scroll", checkOffset );
	$(window).bind( "scroll", checkOffset  );
	$(window).load( checkOffset ); //로드될때*/
}

/*
var accodian =  function(obj){
	var  $obj = $(obj)
		, $btn =  $obj.find(".tit a")
		, $accoCont = $obj.find(".answer-content");

	var display = function(open,Layer){
		if(!open){
			$obj.find(".answer-content").slideUp(400);
			Layer.slideDown(400);
		}else{
			$obj.find(".answer-content").slideUp(400);
		}
	}

	$btn.each(function(){
		$(this).click(function(){
			var idx = $obj.find(".tit a").index(this)
				, Layer = $accoCont.eq(idx)
				, isopen = Layer.is(":visible")? true : false;
				display(isopen,Layer);
			return false;
		});
	});		
}
*/
var accodian = {
  click: function(target) {
	var $target = $(target);
	$target.on('click', function() {

	  if ($(this).hasClass('on')) {
		slideUp($target);
	  } else {
		slideUp($target);
		$(this).addClass('on').next().slideDown(400);
	  }

	  function slideUp($target) {
		$target.removeClass('on').next().slideUp(400);
	  }

	});
  }
};



/* 툴팁  */
function show_guideAge_indi(gnum){
		$("#" + gnum).css("display", "block");
}

function noshow_guideAge_indi(gnum){
        $('#' + gnum ).css('display', 'none');
}