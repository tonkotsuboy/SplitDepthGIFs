/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../param.ts" />
/// <reference path="particleContainer.ts" />
var project;
(function (project) {
    var particle;
    (function (particle) {
        /**
         * パーティクルモーションのクラス
         */
        var ParticleCreator = (function () {
            function ParticleCreator() {
                var _this = this;
                // ステージを準備
                this._canvas = document.getElementById("myCanvas");
                this._stage = new createjs.Stage(this._canvas);
                // タッチ対応
                if (createjs.Touch.isSupported())
                    createjs.Touch.enable(this._stage);
                // Tickerを作成
                createjs.Ticker.timingMode = createjs.Ticker.RAF;
                // メインのレイヤーを配置
                this._mainLayer = new particle.ParticleContainer();
                this._stage.addChild(this._mainLayer);
                // リサイズイベント
                this.resizeHandler();
                window.addEventListener("resize", function () { return _this.resizeHandler(); });
            }
            /**
             * 強制リサイズ処理
             */
            ParticleCreator.prototype.forceResizeHandler = function () {
                this.resizeHandler();
                if (this._stage)
                    this._stage.update();
            };
            /**
             * アニメーションの開始
             */
            ParticleCreator.prototype.start = function () {
                var _this = this;
                createjs.Ticker.addEventListener("tick", function (event) { return _this.tickeHandler(event); });
            };
            /**
             * Tick Handler
             */
            ParticleCreator.prototype.tickeHandler = function (event) {
                if (!event.paused)
                    this._stage.update();
            };
            /**
             * リサイズのイベント処理
             */
            ParticleCreator.prototype.resizeHandler = function () {
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                // ステージのサイズをwindowのサイズに変更
                this._canvas.width = windowWidth;
                this._canvas.height = windowHeight;
                // メインレイヤーにリサイズイベントを通知
                this._mainLayer.resizeHandler(windowWidth, windowHeight);
            };
            return ParticleCreator;
        })();
        particle.ParticleCreator = ParticleCreator;
    })(particle = project.particle || (project.particle = {}));
})(project || (project = {}));
//# sourceMappingURL=particleCreator.js.map