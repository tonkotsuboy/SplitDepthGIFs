/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="particle.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var project;
(function (project) {
    var particle;
    (function (particle_1) {
        /**
         * パーティクル発生装置
         */
        var ParticleEmitter = (function (_super) {
            __extends(ParticleEmitter, _super);
            function ParticleEmitter() {
                _super.call(this);
                /** アニメーション中のパーティクルを格納する配列 */
                this._animationParticles = [];
                /** パーティクルのオブジェクトプール。アニメーションがされていないパーティクルがここに待機している */
                this._particlePool = [];
                this.emitX = 0;
                this.emitY = 0;
                this.vx = 0;
                this.vy = 0;
            }
            /**
             * MainLayerのtickイベント毎に実行される処理
             */
            ParticleEmitter.prototype.update = function (goalX, goalY) {
                // 発生装置はgoalに徐々に近づいていく。
                var dx = goalX - this.emitX;
                var dy = goalY - this.emitY;
                var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)); // 斜め方向の移動距離
                var rad = Math.atan2(dy, dx); // 移動角度
                this.vx = Math.cos(rad) * d * 0.1; // 速度の更新
                this.vy = Math.sin(rad) * d * 0.1; // 速度の更新
                this.emitX += this.vx;
                this.emitY += this.vy;
                // アニメーション中のパーティクルの状態を更新
                this.updateParticles();
            };
            /**
             *　パーティクルを発生させる
             */
            ParticleEmitter.prototype.emitParticle = function () {
                this.updateParticleColor();
                var particle = this.getParticle();
                particle.init(this.emitX, this.emitY, this.vx, this.vy, this.particleColor);
                this.addChild(particle);
                // アニメーション中のパーティクルとして設定
                this._animationParticles.push(particle);
            };
            ParticleEmitter.prototype.updateParticleColor = function () {
                var colorHSL = createjs.Graphics.getHSL(new Date().getTime() / 20 + Math.random() * 60, 90 + Math.random() * 10, 50 + Math.random() * 10);
                this.particleColor = colorHSL;
            };
            /**
             *　パーティクルのアニメーション
             */
            ParticleEmitter.prototype.updateParticles = function () {
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                for (var i = 0; i < this._animationParticles.length; i++) {
                    var particle_2 = this._animationParticles[i];
                    if (!particle_2.isDead) {
                        if (particle_2.y >= windowHeight) {
                            particle_2.vy *= -0.9;
                            particle_2.y = windowHeight;
                        }
                        else if (particle_2.y <= 0) {
                            particle_2.vy *= -0.9;
                            particle_2.y = 0;
                        }
                        if (particle_2.x >= windowWidth) {
                            particle_2.vx *= -0.9;
                            particle_2.x = windowWidth;
                        }
                        else if (particle_2.x <= 0) {
                            particle_2.vx *= -0.9;
                            particle_2.x = 0;
                        }
                        particle_2.update();
                    }
                    else {
                        // particleを取り除く
                        this.removeParticle(particle_2, i);
                    }
                }
            };
            /**
             * オブジェクトプールからパーティクルを取得。
             * プールにパーティクルが無ければ新規作成
             */
            ParticleEmitter.prototype.getParticle = function () {
                if (this._particlePool.length > 0)
                    return this._particlePool.shift();
                else
                    return new particle_1.Particle();
            };
            /**
             * パーティクルを取り除く。
             */
            ParticleEmitter.prototype.removeParticle = function (particle, animationIndex) {
                // Containerからパーティクルをremove
                this.removeChild(particle);
                // アニメーションのパーティクルから取り除く。
                this._animationParticles.splice(animationIndex, 1);
                if (this._particlePool.indexOf(particle) == -1) {
                    // プールにパーティクルが無いことを確認して格納
                    this._particlePool.push(particle);
                }
            };
            return ParticleEmitter;
        })(createjs.Container);
        particle_1.ParticleEmitter = ParticleEmitter;
    })(particle = project.particle || (project.particle = {}));
})(project || (project = {}));
//# sourceMappingURL=particleEmitter.js.map