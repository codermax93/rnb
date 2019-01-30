var range_2_val = 500000, range_3_val = 36

$(document).ready(function () {
	$(".requirements_btn--link_1").click(function () { // элемент клика
		$(".requirements_btn--link_1").toggleClass('requirements_btn--active');
		$(".requirements_btn--link_2").removeClass('requirements_btn--active');
		$(".requirements_list.link_1--mob").toggleClass('requirements_list--active');
		$(".requirements_list link_2--mob").removeClass('requirements_list--active');
		$('[data-toggle="tooltip"]').tooltip(); 
	});
	$(".requirements_btn--link_2").click(function () { // элемент клика
		$(".requirements_btn--link_2").toggleClass('requirements_btn--active');
		$(".requirements_btn--link_1").removeClass('requirements_btn--active');
		$(".requirements_list.link_2--mob").toggleClass('requirements_list--active');
		$(".requirements_list.link_1--mob").removeClass('requirements_list--active');
	});

	$("#range-02").ionRangeSlider({
		skin: "round",
		min: 1000000,
		max: 35000000,
		step: 500000,
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

	$("#range-02-text").on('change', function () {
		$("#range-02").data("ionRangeSlider").update({
			from: $("#range-02-text").val().replace(/[\D\s\._\-]+/g, "")
		});
	});

	$("#range-03-text").on('change', function () {
		var val = Math.round($("#range-03-text").val());
		$("#range-03-text").val(val);
		$("#range-03").data("ionRangeSlider").update({
			from: val
		});
	});

	calculate()
});

$(window).resize(function () {
	if ($(window).width() < 621) {
		$('.requirements_btn--link_1').addClass('requirements_btn--link_1--mob');
		$('.requirements_btn--link_2').addClass('requirements_btn--link_2--mob');
	} else {
		$('.requirements_btn--link_1').removeClass('requirements_btn--link_1--mob');
		$('.requirements_btn--link_2').removeClass('requirements_btn--link_2--mob');
	}

}).resize();

function calculate() {
	var monthly = Math.pow(1.13, 1 / 12) - 1;
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


//  Ajax Contact Form

$(function () {
	$('#send-1, #send-2, #send-3, #send-4, #send-5, #send-6, #send-7').on('submit', function () {
		var formID = $(this).attr('id');
		var formNm = $('#' + formID);
		$.ajax({
			type: 'post',
			url: 'mail/contact.php',
			data: $(this).serialize(),
			success: function () {
				swal("Спасибо за ваш интерес, мы с вами свяжемся в ближайшее время!");
				$(".modal").modal('hide');
			}
		});
		return false;
	});
});

