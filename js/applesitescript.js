"use strict";
var $rightButton = $('#button-right'), $leftButton = $('#button-left');
var $lc1 = $('#lc1'), $lc2 = $('#lc2'), $lc3 = $('#lc3');
var $rightButtonArea = $('#right-button-area');
var $leftButtonArea = $('#left-button-area');
var imgCarouselDiv = $('.img-carousel-div')
var imgCount = 1;
var slideTime = 0;
var $listCircle = $('.list-circle');
var $listCircleDiv = $('#list-circle-div');
var $slider = $('#slider');
var interval;
var lcOn = '1', lcOff = '0.3';
var bgSizeBig = '700px', bgSize = '650px', bgSizeWatchBig = '470px', bgSizeWatch = '430px';
var $img1 = $('#img1'), $img2 = $('#img2'), $img3 = $('#img3'), $img4 = $('#img4'), $img5 = $('#img5');
var timeCheck = 1;
var animationTime = 540;
var check = 0;
var isEnd = 1;
var timeout;


var n = 1;
//interval
function startSlider() {
	interval = setInterval(slideRight, 4000);
}
function stopSlider() {
	clearInterval(interval);
}
$(document).ready(function(){
	startSlider();
	if ($(window).width() > 1050)
		resize(0);
	else
		resize(1);
});
$leftButton.on('click', stopSlider).on('click', slideLeft);
$rightButton.on('click', stopSlider).on('click', slideRight);

function animationSpeedBoost() {
	clearTimeout(timeout);
	if (isEnd == 0) {
		imgCarouselDiv.addClass('img-carousel-div-animation');
		animationTime = 100;
	} else {
		imgCarouselDiv.removeClass('img-carousel-div-animation');
		animationTime = 540;
	}
}

function slideRight() {
	animationSpeedBoost();
    changeSlide(n, 1, 0);
	n++;
}
function slideLeft() {
	animationSpeedBoost();
	changeSlide(n, 0, 1);
	n--;
}

function changeSlide(a, c, d) {
	isEnd = 0;
	timeout = setTimeout(function() {
		isEnd = 1;
	}, 540);
	if ((a > 1 && c == 0) || (a < 3 && c == 1)) {
		$('#img' + (a+c)).css('transform', 'translate('+100*d+'vw,-'+(a+c)*540+'px)');
		$('#img' + (a-1+c)).css('transform', 'translate(-'+80*c+'px,-'+(a-1+c)*540+'px)');
		if (c == 1) {
			$('#img' + (a-1+c)).css('background-size', bgSize);
		} else {
			$('#img' + (a-1+c)).css('background-size', '');
		}
		$listCircle.css('opacity', lcOff);
		$('#lc'+(a-1+2*c)).css('opacity', lcOn);
	} else {
		$listCircle.css('opacity', lcOff);
		$('#lc'+(2*d+1)).css('opacity', lcOn);
		$('#img'+(3*c+1)).css('transform', 'translate('+100*d+'vw,-'+(a+c)*540+'px)');
		$('#img'+(2*d+3)).css('transform', 'translate(-'+80*c+'px,-'+(a*c)*540+'px');
		$('#img'+(3+2*d)).css('background-size',430+(d*40)+'px');
		if (c == 1) {
			setTimeout(firstSlide, animationTime);
		} else {
			setTimeout(lastSlide, animationTime);
		}
	}
}
function firstSlide() {
	if (check == 0){
		imgCarouselDiv.addClass('notransition');
	}
	imgCarouselDiv.css('transform','');
	imgCarouselDiv.css('background-size', '');
	if (check == 0) {
		imgCarouselDiv[0].offsetHeight;
		imgCarouselDiv.removeClass('notransition');
	}
	n = 1;
}
function lastSlide() {
	if (check == 0){
		imgCarouselDiv.addClass('notransition');
	}
	for (var i = 1; i < 4; i++) {
		$('#img'+i).css('transform', 'translate('+(Math.floor(i/3-1)*80)+'px,-'+540*i+'px)');
	}
	$img5.css('transform','translate(-80px, 0)');
	imgCarouselDiv.css('background-size', bgSize);
	for (var i = 3; i < 6; i++) {
		$('#img'+i).css('background-size', '');
	}
	if (check == 0) {
		imgCarouselDiv[0].offsetHeight;
		imgCarouselDiv.removeClass('notransition');
	}
	n = 3;
}

//hover
//tut vse ok
$rightButtonArea.on('mouseenter', function(){
    $rightButton.css('opacity', 0.2);
}).on('mouseleave', function(){
    $rightButton.css('opacity', 0);
});
$leftButtonArea.on('mouseenter', function(){
    $leftButton.css('opacity', 0.2);
}).on('mouseleave', function() {
    $leftButton.css('opacity', 0);
});

$leftButton.mouseenter(function() {
    $leftButton.css('opacity', 0.4);
});
$rightButton.mouseenter(function() {
    $rightButton.css('opacity', 0.4);
});
$listCircle.click(function() {
	stopSlider();
});

$lc1.click(function() {
	lcClick();
	$lc1.css('opacity', 1);
	firstSlide();
	check = 0;
});
$lc2.click(function() {
	if (n == 3) {
		slideLeft();
	} else if (n == 1) {
		slideRight();
	}
	$listCircle.css('opacity', 0.3);
	$lc2.css('opacity', 1);
});
$lc3.click(function() {
	lcClick();
	$lc3.css('opacity', 1);
	lastSlide();
	check = 0;
});
function lcClick() {
	check = 1;
	$listCircle.css('opacity', 0.3);
}

//ресайз
$(window).on('resize', function() {
	if ($(window).width() > 1050)
		resize(0);
	else
		resize(1);
});

function resize(n) {
	$('.img-after').css('width', (24.8 + n*25.1)+'vw');
	$('#footer-div').css('top', (744+202*n)+'px');
}