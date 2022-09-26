jQuery(function ($) {
    'use strict';

		// Header Sticky
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 120){
                $('.navbar').addClass("is-sticky");
            }
            else{
                $('.navbar').removeClass("is-sticky");
            }
		});

		// Navbar JS
        $('.navbar .navbar-nav li a').on('click', function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 10
            }, 50);
            e.preventDefault();
        });
        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });
		$('.navbar .navbar-nav li a').on('click', function(){
            $('.navbar-collapse').collapse('hide');
            $('.burger-menu').removeClass('active');
        });

        // Button Hover JS
		$(function() {
			$('.default-btn')
			.on('mouseenter', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
				$(this).find('span').css({top:relY, left:relX})
			})
			.on('mouseout', function(e) {
				var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
				$(this).find('span').css({top:relY, left:relX})
			});
		});

		// Preloader
		jQuery(window).on('load',function(){
			jQuery(".preloader").fadeOut(500);
		});

        // Book Slider
		$('.book-slider').owlCarousel({
			loop: true,
			nav: true,
			dots: false,
			smartSpeed: 500,
			margin: 20,
			autoplayHoverPause: true,
			autoplay: true,
			navText: [
                "<i class='las la-angle-left'></i>",
                "<i class='las la-angle-right'></i>"
			],

			responsive: {
				0: {
					items: 1
				},
				576: {
					items: 2
				},
				768: {
					items: 3
				},
				1024: {
					items: 3
				},
				1200: {
					items: 3
				}
			}
		});

        // Input Plus & Minus Number JS
        $('.input-counter').each(function() {
            var spinner = jQuery(this),
            input = spinner.find('input[type="text"]'),
            btnUp = spinner.find('.plus-btn'),
            btnDown = spinner.find('.minus-btn'),
            min = input.attr('min'),
            max = input.attr('max');

            btnUp.on('click', function() {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
            btnDown.on('click', function() {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
        });

        // Subscribe form
		$(".newsletter-form").validator().on("submit", function (event) {
			if (event.isDefaultPrevented()) {
			// handle the invalid form...
				formErrorSub();
				submitMSGSub(false, "Please enter your email correctly.");
			} else {
				// everything looks good!
				event.preventDefault();
			}
		});
		function callbackFunction (resp) {
			if (resp.result === "success") {
				formSuccessSub();
			}
			else {
				formErrorSub();
			}
		}
		function formSuccessSub(){
			$(".newsletter-form")[0].reset();
			submitMSGSub(true, "Thank you for subscribing!");
			setTimeout(function() {
				$("#validator-newsletter").addClass('hide');
			}, 4000)
		}
		function formErrorSub(){
			$(".newsletter-form").addClass("animated shake");
			setTimeout(function() {
				$(".newsletter-form").removeClass("animated shake");
			}, 1000)
		}
		function submitMSGSub(valid, msg){
			if(valid){
				var msgClasses = "validation-success";
			} else {
				var msgClasses = "validation-danger";
			}
			$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
		}
		// AJAX MailChimp
		$(".newsletter-form").ajaxChimp({
			url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
			callback: callbackFunction
        });

		// Feedback Carousel
		var $imagesSlider = $(".reviews-slides .reviews-feedback>div"),
		$thumbnailsSlider = $(".reviews-thumbnails>div");
		// Images Options
		$imagesSlider.slick({
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			cssEase: 'linear',
			fade: true,
			autoplay: false,
			draggable: true,
			asNavFor: ".reviews-thumbnails>div",
			prevArrow: '.reviews-feedback .prev-arrow',
			nextArrow: '.reviews-feedback .next-arrow'
		});
		// Thumbnails Options
		$thumbnailsSlider.slick({
			speed: 300,
			slidesToShow: 5,
			slidesToScroll: 1,
			cssEase: 'linear',
			autoplay: false,
			centerMode: true,
			draggable: false,
			focusOnSelect: true,
			asNavFor: ".reviews-slides .reviews-feedback>div",
			prevArrow: '.reviews-thumbnails .prev-arrow',
            nextArrow: '.reviews-thumbnails .next-arrow',
		});

		// Odometer JS
        $('.odometer').appear(function(e) {
			var odo = $(".odometer");
			odo.each(function() {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
		});

        // Go to Top
		$(function(){
			// Scroll Event
			$(window).on('scroll', function(){
				var scrolled = $(window).scrollTop();
				if (scrolled > 600) $('.go-top').addClass('active');
				if (scrolled < 600) $('.go-top').removeClass('active');
			});
			// Click Event
			$('.go-top').on('click', function() {
				$("html, body").animate({ scrollTop: "0" },  500);
			});
		});

		// Popup Video
		$('.popup-youtube').magnificPopup({
			disableOn: 320,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});

		// FAQ Accordion
        $(function() {
            $('.accordion').find('.accordion-title').on('click', function(){
                // Adds Active Class
                $(this).toggleClass('active');
                // Expand or Collapse This Panel
                $(this).next().slideToggle('fast');
                // Hide The Other Panels
                $('.accordion-content').not($(this).next()).slideUp('fast');
                // Removes Active Class From Other Titles
                $('.accordion-title').not($(this)).removeClass('active');
            });
		});

		// Tabs
        (function ($) {
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
            $('.tab ul.tabs li a').on('click', function (g) {
                var tab = $(this).closest('.tab'),
                index = $(this).closest('li').index();
                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');
                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
                g.preventDefault();
            });
		})(jQuery);

		// Screenshot Slider
		$('.screenshot-slider').owlCarousel({
			loop: true,
			nav: false,
			dots: true,
			autoplayHoverPause: true,
			autoplay: true,
            smartSpeed: 1000,
            margin: 30,
            navText: [
                "<i class='flaticon-curve-arrow'></i>",
                "<i class='flaticon-curve-arrow-1'></i>"
            ],
            responsive: {
				0: {
					items: 1
				},
				576: {
					items: 1
				},
				768: {
					items: 2
				},
				1024: {
					items: 3
				},
				1200: {
					items: 3
				}
			}
		});

		// Testimonial Slides
		$('.testimonial-slides').owlCarousel({
			loop: true,
			nav: false,
			dots: true,
			autoplayHoverPause: true,
            autoplay: true,
            mouseDrag: true,
            margin: 0,
            navText: [
                "<i class='las la-angle-left'></i>",
                "<i class='las la-angle-right'></i>"
            ],
			responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                1200: {
                    items: 3,
                },
            }
		});

		// Product Slides
		$('.product-slider').owlCarousel({
			loop: true,
			nav: false,
			dots: true,
			autoplayHoverPause: true,
            autoplay: true,
            mouseDrag: true,
            margin: 30,
            navText: [
                "<i class='las la-angle-left'></i>",
                "<i class='las la-angle-right'></i>"
            ],
			responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 2,
                },
                1200: {
                    items: 3,
                },
            }
		});

		// Input Plus & Minus Number JS
        $('.input-counter').each(function() {
            var spinner = jQuery(this),
            input = spinner.find('input[type="text"]'),
            btnUp = spinner.find('.plus-btn'),
            btnDown = spinner.find('.minus-btn'),
            min = input.attr('min'),
            max = input.attr('max');

            btnUp.on('click', function() {
                var oldValue = parseFloat(input.val());
                if (oldValue >= max) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue + 2;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
            btnDown.on('click', function() {
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 2;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
		});

		// Sidebar Example Demo Modal
		$(".sidebar-demo-control").on('click',  function() {
			$('.example-demo-modal').toggleClass('active');
		});
		$(".example-demo-modal-control").on('click',  function() {
			$('.example-demo-modal').removeClass('active');
		});


}(jQuery));

// function to set a given theme/color-scheme
function setTheme(themeName) {
	localStorage.setItem('zebu_theme', themeName);
	document.documentElement.className = themeName;
}
// function to toggle between light and dark theme

// Immediately invoked function to set the theme on initial load
  $('.slider').slick({
    autoplay: true, //自動的に動き出すか。初期値はfalse。
    infinite: true, //スライドをループさせるかどうか。初期値はtrue。
    slidesToShow: 2.5, //スライドを画面に3枚見せる
    slidesToScroll: 2.5, //1回のスクロールで3枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>', //矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>', //矢印部分NextのHTMLを変更
    dots: true, //下部ドットナビゲーションの表示
    responsive: [
      {
        breakpoint: 769, //モニターの横幅が769px以下の見せ方
        settings: {
          slidesToShow: 2, //スライドを画面に2枚見せる
          slidesToScroll: 2, //1回のスクロールで2枚の写真を移動して見せる
        },
      },
      {
        breakpoint: 500, //モニターの横幅が426px以下の見せ方
        settings: {
          slidesToShow: 1, //スライドを画面に1枚見せる
          slidesToScroll: 1, //1回のスクロールで1枚の写真を移動して見せる
        },
      },
    ],
  })

	//線が伸びるための設定を関数でまとめる
function ScrollTimelineAnime(){
	$('.timeline li').each(function(){// それぞれのli要素の
		var elemPos = $(this).offset().top;// 上からの高さ取得
		var scroll = $(window).scrollTop();// スクロール値取得
		var windowHeight = $(window).height();// windowの高さ取得
		var startPoint = 250; //線をスタートさせる位置を指定※レイアウトによって調整してください
		if (scroll >= elemPos - windowHeight-startPoint){
			var H = $(this).outerHeight(true)//liの余白と高さを含めた数値を取得
			//スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
			var percent = (scroll+startPoint - elemPos) / (H/2) *100;//liの余白と高さの半分で線を100％に伸ばす

			// 100% を超えたらずっと100%を入れ続ける
			if(percent  > 100){
				percent  = 100;
			}
			// ボーダーの長さをセット
			$(this).children('.border-line').css({
				height: percent + "%", //CSSでパーセント指定
			});
		}
	});
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).on('scroll', function(){
	ScrollTimelineAnime();// 線が伸びる関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function(){
	ScrollTimelineAnime();// 線が伸びる関数を呼ぶ
});



//アコーディオンをクリックした時の動作
$('.title').on('click', function () {
  //タイトル要素をクリックしたら
  $('.box').slideUp(500) //クラス名.boxがついたすべてのアコーディオンを閉じる

  var findElm = $(this).next('.box') //タイトル直後のアコーディオンを行うエリアを取得

  if ($(this).hasClass('close')) {
    //タイトル要素にクラス名closeがあれば
    $(this).removeClass('close') //クラス名を除去
  } else {
    //それ以外は
    $('.close').removeClass('close') //クラス名closeを全て除去した後
    $(this).addClass('close') //クリックしたタイトルにクラス名closeを付与し
    $(findElm).slideDown(500) //アコーディオンを開く
  }
})

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function () {
  $('.accordion-area li:first-of-type section').addClass('open') //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $('.open').each(function (index, element) {
    //openクラスを取得
    var Title = $(element).children('.title') //openクラスの子要素のtitleクラスを取得
    $(Title).addClass('close') ///タイトルにクラス名closeを付与し
    var Box = $(element).children('.box') //openクラスの子要素boxクラスを取得
    $(Box).slideDown(500) //アコーディオンを開く
  })
})

//アコーディオンをクリックした時の動作
$('.title2').on('click', function () {
  //タイトル要素をクリックしたら
  $('.box').slideUp(500) //クラス名.boxがついたすべてのアコーディオンを閉じる

  var findElm = $(this).next('.box') //タイトル直後のアコーディオンを行うエリアを取得

  if ($(this).hasClass('close')) {
    //タイトル要素にクラス名closeがあれば
    $(this).removeClass('close') //クラス名を除去
  } else {
    //それ以外は
    $('.close').removeClass('close') //クラス名closeを全て除去した後
    $(this).addClass('close') //クリックしたタイトルにクラス名closeを付与し
    $(findElm).slideDown(500) //アコーディオンを開く
  }
})

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on('load', function () {
  $('.accordion-area li:first-of-type section').addClass('open') //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $('.open').each(function (index, element) {
    //openクラスを取得
    var Title = $(element).children('.title') //openクラスの子要素のtitleクラスを取得
    $(Title).addClass('close') ///タイトルにクラス名closeを付与し
    var Box = $(element).children('.box') //openクラスの子要素boxクラスを取得
    $(Box).slideDown(500) //アコーディオンを開く
  })
})



$('.u-accordion-btn-1').on('click', function () {
  $('.u-accordion-btn-1').addClass('-opened')
	$('.u-accordion-btn-1').addClass('-onlyOnce')
})

$('.u-accordion-btn-2').on('click', function () {
  $('.u-accordion-btn-2').addClass('-opened')
  $('.u-accordion-btn-2').addClass('-onlyOnce')
})

$('.u-accordion-btn-3').on('click', function () {
  $('.u-accordion-btn-3').addClass('-opened')
  $('.u-accordion-btn-3').addClass('-onlyOnce')
})

$('.u-accordion-btn-4').on('click', function () {
  $('.u-accordion-btn-4').addClass('-opened')
  $('.u-accordion-btn-4').addClass('-onlyOnce')
})

$('.u-accordion-btn-5').on('click', function () {
  $('.u-accordion-btn-5').addClass('-opened')
  $('.u-accordion-btn-5').addClass('-onlyOnce')
})

$('.u-accordion-btn-6').on('click', function () {
  $('.u-accordion-btn-6').addClass('-opened')
  $('.u-accordion-btn-6').addClass('-onlyOnce')
})