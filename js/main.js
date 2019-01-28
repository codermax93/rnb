// $(window).scroll(function () {
//     var height = $(window).scrollTop();

//     /*Если сделали скролл на 100px задаём новый класс для  header-mb*/
//     if (height > 100) {
//         $('.header .g-wrapper .g-content').addClass('header-fixed');
//         $('.header').addClass('header-mb');
//     } else {
//         /*Если меньше 100px удаляем класс для header-mb*/
//         $('.header .g-wrapper .g-content').removeClass('header-fixed');
//         $('.header').removeClass('header-mb');
//     }
// });

window.onload = function () {
	sliders();
}

function sliders() {

	var tracks = [
		'-webkit-slider-runnable-track',
	];

	var thumbs = [
		'-webkit-slider-thumb',
	];

	initSliders();
	var sliderGroups = document.querySelectorAll('section[data-type=slider-group]');
	for (var i=0;i<sliderGroups.length;i+=1) {
		initSliderGroup(sliderGroups[i]);
	}

	function initSliders() {
		var sliders = document.querySelectorAll('input[type=range]');
		var testAndWK = window.getComputedStyle(sliders[0],'::-webkit-slider-thumb').background;
		for (var i=0;i<sliders.length;i+=1) {
			if (!testAndWK) {
				sliders[i].style.WebkitAppearance = 'slider-horizontal';
			}
			
			// prepare a <style> tag that will be used by handleSlider()
			
			var st = document.createElement('style');
			st.id = 's' + sliders[i].id;
			document.head.appendChild(st);


			sliders[i].addEventListener('input',function () {handleSlider(this)},false);
			sliders[i].addEventListener('change',function () {handleSlider(this)},false);

			sliders[i].output = sliders[i].parentNode.querySelector('output');
			var dataSpan = sliders[i].parentNode.querySelector('span');
			if (dataSpan && dataSpan.getAttribute('data-labels')) {
				sliders[i].values = [];
				var values = dataSpan.getAttribute('data-labels').split(';');
				for (var j=0;j<values.length;j+=1) {
					sliders[i].values.push(values[j]);
				}
			}
			
			
			if (sliders[i].value*1) {
				handleSlider(sliders[i]);
			}
		}
	}

	function handleSlider(slider) {
	
		// this sets the gradient for one slider to the correct color stops
		// needs a prepared <style> tag created by initSliders()
	
		var gradValue = Math.round((slider.value/slider.getAttribute('max')*1)*100);
		var grad = 'linear-gradient(90deg,#f7ba1e ' + gradValue + '%, #a4a7b7 ' + (gradValue+1) + '%)';
		var rangeSelector = 'input[id='+slider.id+']::';
		var styleString = '';
		var printedValue = (slider.values) ? slider.values[slider.value] : slider.value;
		slider.output.innerHTML = printedValue;
		for (var j=0;j<tracks.length;j+=1) {
			styleString += rangeSelector + tracks[j] + '{background: ' + grad + ';} ';
		}
		document.getElementById('s'+slider.id).textContent = styleString;
	}

	function initSliderGroup(parent) {
		var sliders = parent.querySelectorAll('input[type=range]');
		var max = parent.querySelector('div').getAttribute('data-total')*1;
		var groupRoster = [];
		var timeout;
		for (var i=0;i<sliders.length;i+=1) {
			groupRoster.push(sliders[i]);
			sliders[i].others = [];
			sliders[i].addEventListener('input',trackChange,false);
			sliders[i].addEventListener('change',trackChange,false);
		}
		for (var i=0;i<sliders.length;i+=1) {
			for (var j=0;j<groupRoster.length;j+=1) {
				if (groupRoster[j] !== sliders[i]) {
					sliders[i].others.push(groupRoster[j]);
				}
			}
		}
	
		function trackChange () {
			var that = this;
			clearTimeout(timeout);
			timeout = setTimeout(function () {
				setOtherSliders(that);
			},100);
		}

		function setOtherSliders(slider) {
			var currentTotal = calculateTotal();
			if (currentTotal > max) {
				var excess = currentTotal - max;
				var totalFromOthers = currentTotal - (slider.value*1);
				for (var j=0;j<slider.others.length;j+=1) {
					var newValue = Math.round(slider.others[j].value - ((slider.others[j].value/totalFromOthers)*excess));
					slider.others[j].value = newValue;
					handleSlider(slider.others[j]);
				}
			}
		}

	
		function calculateTotal () {
			var total = 0;
			for (var i=0;i<groupRoster.length;i+=1) {
				total += groupRoster[i].value*1;
			}
			return total;
		}
	
	}
}

// function $(id) {
// 	return document.getElementById(id);
// }


$(document).ready(function () {
    $(".requirements_btn--link_1").click(function () { // элемент клика
		$(".requirements_btn--link_1").toggleClass('requirements_btn--active');
		$(".requirements_btn--link_2").removeClass('requirements_btn--active');
		$(".requirements_list.link_1--mob").toggleClass('requirements_list--active');
		$(".requirements_list link_2--mob").removeClass('requirements_list--active');
	});
	$(".requirements_btn--link_2").click(function () { // элемент клика
		$(".requirements_btn--link_2").toggleClass('requirements_btn--active');
		$(".requirements_btn--link_1").removeClass('requirements_btn--active');
		$(".requirements_list.link_2--mob").toggleClass('requirements_list--active');
		$(".requirements_list.link_1--mob").removeClass('requirements_list--active');
	});
});

$(window).resize(function() {
    if ($(window).width() < 621) {
		$('.requirements_btn--link_1').addClass('requirements_btn--link_1--mob');
		$('.requirements_btn--link_2').addClass('requirements_btn--link_2--mob');
    } else {
		$('.requirements_btn--link_1').removeClass('requirements_btn--link_1--mob');
		$('.requirements_btn--link_2').removeClass('requirements_btn--link_2--mob');
	}

}).resize();