/// <reference path="../../typings/easeljs/easeljs.d.ts" />
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
         * パーティクルのクラス
         */
        var Particle = (function (_super) {
            __extends(Particle, _super);
            function Particle() {
                _super.call(this, "", "12px FontAwesome");
                this._isStar = Math.random() > 0.8;
                var iconStr = this.getIconStr(this._isStar);
                this.text = iconStr;
                var iconSize = this.getIconSize(this._isStar);
                this.font = iconSize + "px FontAwesome";
                // 加算で重ねる
                this.compositeOperation = "lighter";
                this.mouseEnabled = false;
            }
            Particle.prototype.getIconSize = function (isStar) {
                if (!isStar)
                    return 16 + Math.floor(60 * Math.random());
                else
                    return 15 + Math.floor(50 * Math.random());
            };
            Particle.prototype.getIconStr = function (isStar) {
                // アイコンの Unicode を指定
                var iconUnicode = !isStar ? "f001" : "f005";
                // Unicode から文字コードに変換
                var iconInt = parseInt(iconUnicode, 16);
                // 文字コードから文字列に変換する
                var iconStr = String.fromCharCode(iconInt);
                // CreateJS のテキストを作成
                return iconStr;
            };
            /**
             * パーティクルの初期化
             * @param parentVX, parentVY :親コンテナの速度。パーティクルの速度に影響を与える。
             */
            Particle.prototype.init = function (emitX, emitY, parentVX, parentVY, particleColor) {
                this.x = emitX;
                this.y = emitY;
                this._life = 70 + Math.random() * 20;
                this._count = 0;
                this.vx = parentVX + (Math.random() - 0.5) * 6;
                this.vy = parentVY - 6 - Math.random() * 6;
                this.isDead = false;
                this.alpha = 1;
                this.rotation = 50 * Math.PI * (Math.random() - 0.5);
                this.color = particleColor;
            };
            /**
             * パーティクルの時間経過処理。
             * _countがパーティクルの年齢。
             * _lifeを超えたら死亡する。
             *
             */
            Particle.prototype.update = function () {
                this._count++;
                if (this._count <= this._life) {
                    this.x += this.vx;
                    this.vy += 0.5;
                    this.y += this.vy;
                    // 死にそうになったら点滅を開始
                    if (this._count >= this._life / 2)
                        this.alpha = (1 - this._count / this._life);
                }
                else {
                    // 寿命が来たらフラグを立てる
                    this.isDead = true;
                }
            };
            return Particle;
        })(createjs.Text);
        particle.Particle = Particle;
    })(particle = project.particle || (project.particle = {}));
})(project || (project = {}));
//# sourceMappingURL=particle.js.map