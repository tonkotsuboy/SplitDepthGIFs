/// <reference path="task/createAudioSpriteManifestTask.ts" />
/// <reference path="task/createSoundManifestTask.ts" />
/// <reference path="task/progressLoadingBarTask.ts" />
/// <reference path="particle/particleCreator.ts" />
/// <reference path="trace.ts" />
createjs.Sound.initializeDefaultPlugins();
var project;
(function (project) {
    /**
     * メインとなるクラス
     */
    var Main = (function () {
        function Main() {
            this._startTime = new Date();
            this._particleCreator = new project.particle.ParticleCreator();
            this._particleCreator.forceResizeHandler();
            this._loadingBarTask = new project.ProgressLoadingBarTask(this);
            createjs.Sound.alternateExtensions = ["mp3"];
            this.showContentsInfo();
        }
        /**
         * コンテンツの情報を表示する
         */
        Main.prototype.showContentsInfo = function () {
            this.checkDeviceInfo();
            this.checkLowPerformanceMode();
            var contentsInfo = document.getElementById("contentsInfo");
            var contentsInfoText = createjs.Sound.activePlugin.toString();
            if (project.Param.lowPerformance)
                contentsInfoText += "<br>Low Performance Mode";
            contentsInfo.innerHTML = contentsInfoText;
        };
        /**
         * 閲覧環境をチェックする
         */
        Main.prototype.checkDeviceInfo = function () {
            var ua = navigator.userAgent;
            if (ua.indexOf("iPhone") > 0 || ua.indexOf("iPad") > 0 || ua.indexOf("iPod") > 0)
                project.Param.isIOS = true;
            else if (ua.indexOf("Android") > 0)
                project.Param.isAndroid = true;
        };
        /**
         * 低パフォーマンスで動作させるかどうかを決定する
         * iOS、Androidの場合は低パフォーマンスモード
         */
        Main.prototype.checkLowPerformanceMode = function () {
            var contentsInfo = document.getElementById("contentsInfo");
            var activePlugin = createjs.Sound.activePlugin.toString();
            if (activePlugin.indexOf("HTMLAudio") > 0)
                project.Param.isHTMLAudio = true;
            if (project.Param.isAndroid || project.Param.isIOS)
                project.Param.lowPerformance = true;
            if (project.Param.isHTMLAudio && isAudioSprite)
                alert("申し訳ありません。ご利用の環境では正常に動作いたしません。");
        };
        Main.prototype.init = function () {
            var soundManifest;
            if (isAudioSprite) {
                var createSoundManifestTask = new project.CreateAudioSpriteManifestTask();
                soundManifest = createSoundManifestTask.getSoundManifest();
            }
            else {
                var createSoundManifestTask = new project.CreateSoundManifestTask();
                soundManifest = createSoundManifestTask.getSoundManifest();
            }
            // Webフォントのプリロード。非同期
            WebFont.load({
                custom: {
                    // フォントファミリーを指定
                    families: ['FontAwesome'],
                    // CSS の URL を指定
                    urls: [
                        'css/style.css'
                    ]
                }
            });
            this.startPreload(soundManifest);
        };
        /**
         * プリロードを開始する
         */
        Main.prototype.startPreload = function (soundManifest) {
            var _this = this;
            var queue = new createjs.LoadQueue();
            queue.installPlugin(createjs.Sound);
            queue.addEventListener("progress", function (event) { return _this.progressHandler(event); });
            queue.addEventListener("complete", function (event) { return _this.loadComplete(event); });
            queue.setMaxConnections(1);
            queue.loadManifest(soundManifest);
        };
        Main.prototype.progressHandler = function (event) {
            this._loadingBarTask.update(event.progress);
        };
        Main.prototype.loadComplete = function (event) {
            this.showDownLoadInfo();
            this._loadingBarTask.completeHandler();
        };
        Main.prototype.start = function () {
            this._particleCreator.start();
        };
        /*
        * ダウンロード情報を表示する。
        */
        Main.prototype.showDownLoadInfo = function () {
            this._endTime = new Date();
            var downloadTime = (this._endTime.getTime() - this._startTime.getTime()) / 1000;
            var downloadInfo = document.getElementById("downloadInfo");
            downloadInfo.innerHTML = "DL Time : " + downloadTime.toFixed(1) + "s";
        };
        return Main;
    })();
    project.Main = Main;
})(project || (project = {}));
window.addEventListener("load", function (event) {
    var main = new project.Main();
    main.init();
});
//# sourceMappingURL=main.js.map