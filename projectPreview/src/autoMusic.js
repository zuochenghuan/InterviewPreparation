// 音乐自动播放；点击播放，再次点击停止；播放时按钮icon的音乐条跳动；
nie.define('index', function () {
    var $window = $(window),
        $bgMusic = $('#bgMusic'),
        $bgMusicBtn = $('.js-play-bgmusic'),
        bgMusic = $bgMusic[0];

    var bgmMethods = {
        bindEvent: function () {  // 绑定音乐开、关事件
            var self = this;
            // 背景音乐开关
            $bgMusicBtn.on('click', function () {
                if (bgMusic.paused) {
                    self.playBgMusic();
                } else {
                    self.pauseBgMusic();
                }
            });
        },
        playBgMusic: function () {
            bgMusic.play();
        },
        pauseBgMusic: function () {
            bgMusic.pause();
            $bgMusicBtn.removeClass('playing'); // 用playing类名控制音乐播放按钮的动画
        },
        setBgMusicPlaying: function () {
            $bgMusicBtn.addClass('playing');
        },
        setBgMusicPaused: function () {
            $bgMusicBtn.removeClass('playing');
        },
        autoplayBgMusic: function () { // 自动播放背景音乐
            var self = this;
            var isFirstTouchScreen = false;
            // 为兼容iOS和微信，需用户交互事件触发后加载音频
            bgMusic.load(); // 需要主动触发下，不然不会加载  
            self.playBgMusic();
            document.addEventListener("WeixinJSBridgeReady", function () {  // 微信端兼容
                self.playBgMusic();
            }, false);  // false对应的是 事件冒泡
            document.addEventListener("touchstart", function () {  // ios兼容
                if (isFirstTouchScreen) {
                    return;
                }
                isFirstTouchScreen = true;
                self.playBgMusic();
            }, false);

            if (bgMusic.readyState == 4) {  //其他客户端兼容。 ajax的状态码（完成）响应内容解析完成，可以在客户端调用了 
                self.playBgMusic();
            } else {
                bgMusic.addEventListener("canplaythrough", function () {  // 循环播放不停歇
                    self.playBgMusic();
                }, false);
            }

            // 判断音频是否播放
            bgMusic.addEventListener('timeupdate', function (e) { // 
                self.setBgMusicPlaying();
            });
            bgMusic.addEventListener('play', function (e) {
                self.setBgMusicPlaying();
            }, false);

            bgMusic.addEventListener('pause', function (e) {
                self.setBgMusicPaused();
            }, false);
            bgMusic.addEventListener("playing", function (e) {
                self.setBgMusicPlaying();
            });
        },
        render: function () {
            this.autoplayBgMusic();
            this.bindEvent();
        }
    };
    bgmMethods.render();
});