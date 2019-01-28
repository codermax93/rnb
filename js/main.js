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
var range_2_val = 500000, range_3_val = 36

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

	$("#range-02").ionRangeSlider({
		skin: "round",
		min: 0,
		max: 35000000,
		step: 1000,
		from: range_2_val,
		hide_min_max: true,
		hide_from_to: true,
		onChange: function (data) {
			$("#range-02-text").val(data.from_pretty);
			range_2_val = data.from;
			calculate();
		},
		onUpdate: function (data) {
			$("#range-02-text").val(data.from_pretty);
			range_2_val = data.from;
			calculate();
		}
	});

	$("#range-03").ionRangeSlider({
		skin: "round",
		min: 1,
		max: 84,
		step: 1,
		from: range_3_val,
		hide_min_max: true,
		hide_from_to: true,
		onChange: function (data) {
			$("#range-03-text").val(data.from);
			range_3_val = data.from;
			calculate();
		},
		onUpdate: function (data) {
			$("#range-03-text").val(data.from);
			range_3_val = data.from;
			calculate();
		}
	});

    $("#range-02-text").on('change',function() {
        $("#range-02").data("ionRangeSlider").update({
            from: $("#range-02-text").val().replace(/[\D\s\._\-]+/g, "")
        });
    });

    $("#range-03-text").on('change',function() {
        var val = Math.round($("#range-03-text").val());
        $("#range-03-text").val(val);
        $("#range-03").data("ionRangeSlider").update({
            from: val
        });
	});

	calculate()
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

function calculate() {
	var monthly = Math.pow(1.13, 1/12) - 1;
	var s = Math.round((monthly * Math.pow(1 + monthly, range_3_val)) / (Math.pow(1 + monthly, range_3_val) - 1) * range_2_val).toLocaleString()
	var b = $("#range-02").data("ionRangeSlider").result.from_pretty,
		m = $("#range-03").data("ionRangeSlider").result.from
	
	$("#range-02-text").val(b);
	$("#range-03-text").val(m);
	$('#range-calc').text(s)

	$("#calc-budget").text(b)
	$("#calc-month").text(m)
	$('#calc-result').text(s)
}
