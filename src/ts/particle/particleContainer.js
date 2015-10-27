/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../../typings/soundjs/soundjs.d.ts" />
/// <reference path="../param.ts" />
/// <reference path="particleEmitter.ts" />
/// <reference path="particleLineDrawer.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var project;
(function (project) {
    var particle;
    (function (particle) {
        /**
         * パーティクルを発生させるコンテナ
         */
        var ParticleContainer = (function (_super) {
            __extends(ParticleContainer, _super);
            function ParticleContainer() {
                var _this = this;
                _super.call(this);
                this._tickCount = 0;
                this._particleTick = 0;
                this.emitFrequency = 1;
                if (project.Param.lowPerformance)
                    this.emitFrequency = 5;
                this._bg = new createjs.Shape();
                this.drawBG(800, 600);
                this.addChild(this._bg);
                this._lineDrawer = new particle.LineDrawer();
                this.addChild(this._lineDrawer);
                this._particleEmitter = new particle.ParticleEmitter(); // パーティクル発生装置のインスタンスを作成
                this.addChild(this._particleEmitter);
                this.addEventListener("tick", function (event) { return _this.tickHandler(event); });
                this.addEventListener("mousedown", function (event) { return _this.mouseDownHandler(event); });
                this.addEventListener("pressup", function (event) { return _this.mouseUpHandler(event); });
            }
            ParticleContainer.prototype.resizeHandler = function (windowWidth, windowHeight) {
                this.drawBG(windowWidth, windowHeight);
            };
            /**
             * 指定の大きさの背景を描画
             */
            ParticleContainer.prototype.drawBG = function (bgWidth, bgHeight) {
                this._bg.graphics.clear();
                this._bg.graphics.beginLinearGradientFill(["#011c31", "#001121"], [0, 1], 0, 0, 0, bgHeight)
                    .drawRect(0, 0, bgWidth, bgHeight)
                    .endFill();
            };
            /**
             * マウスを押した時の処理
             */
            ParticleContainer.prototype.mouseDownHandler = function (event) {
                this._isMouseDown = true;
            };
            /**
             * マウスを離した時の処理
             */
            ParticleContainer.prototype.mouseUpHandler = function (event) {
                this._isMouseDown = false;
            };
            /**
             * Tickイベントで実行される処理
             */
            ParticleContainer.prototype.tickHandler = function (event) {
                // マウスの座標
                var mouseX = this.getStage().mouseX;
                var mouseY = this.getStage().mouseY;
                // パーティクル発生装置の座標を更新
                this._particleEmitter.update(mouseX, mouseY);
                if (this._isMouseDown) {
                    this._tickCount++;
                    if (this._tickCount % this.emitFrequency == 0) {
                        // マウスを押している場合にパーティクル発生命令
                        this._particleEmitter.emitParticle();
                    }
                    this.playSE();
                    this._lineDrawer.addLinePoint(this._particleEmitter.emitX, this._particleEmitter.emitY);
                }
                else {
                    this._lineDrawer.shiftLinePoint();
                }
                this._tickCount++;
                this._lineDrawer.update(this._particleEmitter.particleColor);
            };
            /**
             * 効果音を鳴らす
             */
            ParticleContainer.prototype.playSE = function () {
                // 7フレームに1回処理
                if (this._particleTick++ % 7 == 0) {
                    var soundID = "se_" + Math.floor(Math.random() * project.Param.SE_NUM);
                    createjs.Sound.play(soundID, { pan: 0.01 });
                }
            };
            return ParticleContainer;
        })(createjs.Container);
        particle.ParticleContainer = ParticleContainer;
    })(particle = project.particle || (project.particle = {}));
})(project || (project = {}));
//# sourceMappingURL=particleContainer.js.map