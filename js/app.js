
var params_data = {
	data_1: {temp: 27, strong: "強", tv_ch: 1, tv_name: "7:00 おはようジャパン<br>JHK", light: 6, lightcolor: "", lighttype: "さわやか", music_num: 0, music_tit: "朝のジャズ"},
	data_2: {temp: 28, strong: "中", tv_ch: 4, tv_name: "8:00 モーニング・朝<br>モズテレビ", light: 7, music_num: 1, music_tit: "朝食に聞くクラシック"},
	data_3: {temp: 28, strong: "中", tv_ch: 5, tv_name: "8:30 おはようジャパン<br>JHK", light: 6, music_num: 2, music_tit: "朝のジャズ"},
	data_4: {temp: 27, strong: "強", tv_ch: 1, tv_name: "7:00 おはようジャパン<br>JHK", light: 6, music_num: 3, music_tit: "朝のジャズ"},
	data_5: {temp: 27, strong: "強", tv_ch: 1, tv_name: "7:00 おはようジャパン<br>JHK", light: 6, music_num: 4, music_tit: "朝のジャズ"},
	data_6: {temp: 27, strong: "強", tv_ch: 1, tv_name: "7:00 おはようジャパン<br>JHK", light: 6, music_num: 5, music_tit: "朝のジャズ"},
	data_7: {temp: 27, strong: "強", tv_ch: 1, tv_name: "7:00 おはようジャパン<br>JHK", light: 6, music_num: 6, music_tit: "朝のジャズ"},
	data_8: {temp: 27, strong: "強", tv_ch: 1, tv_name: "7:00 おはようジャパン<br>JHK", light: 6, music_num: 7, music_tit: "朝のジャズ"}
};

var electro_power_data = [
	{"used_power_num": 365, "comp_num": "+63"},
	{"used_power_num": 263, "comp_num": "+61"},
	{"used_power_num": 137, "comp_num": "+20"},
	{"used_power_num": 75, "comp_num": "+60"},
	{"used_power_num": 463, "comp_num": "+43"},
	{"used_power_num": 477, "comp_num": "+23"},
	{"used_power_num": 400, "comp_num": "+55"},
	{"used_power_num": 600, "comp_num": "+79"},
	{"used_power_num": 300, "comp_num": "+145"},
	{"used_power_num": 422, "comp_num": "+124"},
	{"used_power_num": 475, "comp_num": "+189"},
];

var temps_data = [
	{"temp": 22, "time": 6},
	{"temp": 23, "time": 9},
	{"temp": 25, "time": 12},
	{"temp": 26, "time": 15},
	{"temp": 24, "time": 18},
	{"temp": 24, "time": 21},
	{"temp": 22, "time": 0},
	{"temp": 20, "time": 3}
];

var transition_types = [
	'random',
	'bars',
	'blinds',
	'blocks',
	'blocks2',
	'concentric',
	'slide',
	'warp',
	'zip',
	'bars3d',
	'blinds3d',
	'cube',
	'tiles3d',
	'turn'
];

var transition_type = "random";
var transtion_type_index = 0;

var slider;
var startX = 0;
var THRESHOLD = 20;


function initSlider () {
	slider = new flux.slider('#slider', {
		autoplay: false,
		pagination: false
	});
	var obj = $('#photo_nav div.img');
	obj.on('touchend', function (event) {
		var index = obj.index(this); // 定義順インデックス
		// インデックス、トランジション（エフェクト）を指定してshowImage呼出し
		slider.showImage(index, transition_type === 'random' ? undefined : transition_type);
		event.preventDefault();
	});

	var selector = $('#transition_selection');
	selector.text(transition_types[transtion_type_index]);
	selector.on('touchend', function() {
		if (transtion_type_index < transition_types.length -1) {
			transtion_type_index += 1;
		} else {
			transtion_type_index = 0;
		}
		transition_type = transition_types[transtion_type_index];
		selector.text(transition_type);
	});

}

function initVideoViewerEvent() {
	var init_video_pos = 0;
	var startVideoPageY = 0;
	var moveVideoPageY = 0;
	$('#video_nav').on('touchstart', function(e) {
		if (e.touches && e.touches.length > 0) {
		 init_video_pos = e.touches[0].pageY + $('#video_nav').scrollTop();
		 if (e.touches.length === 1) {
			 startVideoPageY = e.touches[0].pageY;
		 }
	 }
	});
	$('#video_nav').on('touchend', function(e) {
		if (e.touches) {
			if (e.touches.length > 0) {
				init_video_pos = e.touches[0].pageY + $('#video_nav').scrollTop();
			} else {
				if (moveVideoPageY > THRESHOLD) {
					e.stopPropagation();
		 		}
				startVideoPageY = moveVideoPageY = 0;
	 		}
		}
	});
	$('#video_nav').on('touchmove', function(e) {
		if (e.touches) {
			$('#video_nav').scrollTop(init_video_pos - e.touches[0].pageY);
			moveVideoPageY = Math.abs(e.touches[0].pageY - startVideoPageY);
		}
	});
}

$(".ctrl_btns li, .touchmonth_li, .chart_panel, .app_photo, .app_video").on("touchstart", function (e) {
	$(this).addClass("active");
	if (e.changedTouches) {
		startX = e.changedTouches[0].pageX;
	}
	//console.log(this)
});

$(document).on("touchend", ".ctrl_btns li, .touchmonth_li, .chart_panel, .app_photo, .app_video", function (e) {
	$(this).removeClass("active");
	//console.log(this.className);
	if (e.changedTouches) {
		var moveX = Math.abs(e.changedTouches[0].pageX - startX);
		startX = 0;
		if (moveX > THRESHOLD) {
		 return;
		}
	}
	if(this.className.indexOf("data_") !== -1) {
		var datanum = $(this).attr("class");
		$(".app_temp .param_value em").text(params_data[datanum].temp);
		$(".app_temp .param_data ").text("冷房｜"+params_data[datanum].strong);
		$(".app_tv .param_value em").text(params_data[datanum].tv_ch);
		$(".app_tv .param_data em").text(params_data[datanum].tv_name);
	} else if(this.className.indexOf("touchmonth_li") !== -1) {
		var index_li = Number($(this).attr("id").replace("m", ""));
		if($(".detail").hasClass("power_detail")) {
			if(index_li > 9) {
				$(".tooltip").css({"right": 680 - index_li*61, "left": "auto"});
			}else{
				$(".tooltip").css({"left": index_li*61, "right": "auto"});
			}
			$(".tooltip .start_month").text(index_li);
			$(".tooltip .end_month").text(index_li+1);
			$(".tooltip .used_power_num").text(electro_power_data[index_li-1].used_power_num);
			$(".tooltip .comp_num").text(electro_power_data[index_li-1].comp_num);
			$(".touchmonth_li").removeClass("active");
			$(this).addClass("active");
		} else if($(".detail").hasClass("temp_detail")) {
			if(index_li > 9) {
				$(".tooltip").css({"right": 680 - index_li*79, "left": "auto"});
			} else {
				$(".tooltip").css({"left": index_li*79, "right": "auto"});
			}
			$(".tooltip .used_power_num").text(temps_data[index_li-1].temp);
			$(".tooltip .times").text(temps_data[index_li-1].time);
			$(".touchmonth_li").removeClass("active");
			$(this).addClass("active");
		}
		//console.log(electro_power_data[index_li-1].comp_num)
	} else if(this.className.indexOf("chart_panel") !== -1) {
		var load_page = (this.className.indexOf("chart_temp") === -1) ? "./power_detail.html" : "./temp_detail.html";
		$(".detail_window_load_content").empty().load(load_page, function () {
			$(".detail_window").addClass("show");
		});
	} else if(this.className.indexOf("app_photo") !== -1) {
		$(".detail_window_load_content").empty().load("./photo_viewer.html", function () {
			$(".detail_window").addClass("show");
			initSlider();
		});
	} else if(this.className.indexOf("app_video") !== -1) {
		$(".detail_window_load_content").empty().load("./video_viewer.html", function () {
			$(".detail_window").addClass("show");
			initVideoViewerEvent();
		});
	}
});

$(document).on("touchend", ".close_btn", function () {
	$(".detail_window").removeClass("show");
	$(".detail_window_load_content").empty();
	if (location.hash.match(/#id_ctrl|photo/gi)) {
		//location.hash = ""
	}
});
$(document).on("touchend", ".header_close_btn", function () {
	$(".detail_window").removeClass("show");
	$(".detail_window_load_content").empty();
	location.hash = '';
  $(".global_header").removeClass("hide_close");
});

$('#anchor_id_ctrl').on("touchstart", function(e) {
	if (e.changedTouches) {
		startX = e.changedTouches[0].pageX;
	}
});

$('#anchor_id_ctrl').on("touchend", function(e) {
	if (e.changedTouches) {
		var moveX = Math.abs(e.changedTouches[0].pageX - startX);
		startX = 0;
		if (moveX > THRESHOLD) {
		 return;
		}
		$('.global_header').addClass('hide_close');
		location.hash = "#id_ctrl";
	}
});

$(document).on("change","#transition_type", function () {
	transition_type = this.value;
	//initSlider();
});

var init_pos = 0;
$('main').on('touchstart touchend', function(e) {
	if (e.touches && e.touches.length > 0) {
		init_pos = e.touches[0].pageX + $('main').scrollLeft();
	}
});
$('main').on('touchmove', function(e) {
	if (e.touches) {
		$('main').scrollLeft(init_pos - e.touches[0].pageX);
	}
});

function hackPause() {
	$(".video_app_content video")[0].play();
}

// video
$(document).on("touchend", "#video_nav .thumb_video", function (e) {
	$(".video_app_content").addClass("playing");
	$(".video_app_content video").on('pause', hackPause);  // temporary code
})

$(document).on("touchend", ".video_app_content .detail_close_btn", function (e) {
	$(".video_app_content").removeClass("playing");
	$(".video_app_content video").off('pause', hackPause);  // temporary code
	var video = $(".video_app_content video")[0];
	video.pause();
	video.currentTime = 0;
})

// 玄関に人がきた


// chart
