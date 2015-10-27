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
         * 軌跡を描くクラス
         */
        var LineDrawer = (function (_super) {
            __extends(LineDrawer, _super);
            function LineDrawer() {
                _super.call(this);
                this.compositeOperation = "lighter";
                this._linePoint = [];
            }
            LineDrawer.prototype.addLinePoint = function (emitX, emitY) {
                var linePoint = new LinePointData(emitX, emitY);
                this._linePoint.push(linePoint);
            };
            LineDrawer.prototype.shiftLinePoint = function () {
                this._linePoint.shift();
            };
            LineDrawer.prototype.update = function (particleColor) {
                // Emitterの状態に応じて線を描く
                this.graphics.clear();
                var max = this._linePoint.length - 1;
                for (var i = 0; i < max; i++) {
                    var p1 = this._linePoint[i];
                    var p2 = this._linePoint[i + 1];
                    // Emitterの状態に応じて線を描く
                    this.graphics
                        .setStrokeStyle(10, "round") // 線の太さ
                        .beginStroke(particleColor)
                        .moveTo(p1.x, p1.y)
                        .lineTo(p2.x, p2.y);
                }
                if (max > 18) {
                    this._linePoint.shift();
                }
            };
            return LineDrawer;
        })(createjs.Shape);
        particle.LineDrawer = LineDrawer;
        var LinePointData = (function () {
            function LinePointData(emitX, emitY) {
                this.x = emitX;
                this.y = emitY;
            }
            return LinePointData;
        })();
    })(particle = project.particle || (project.particle = {}));
})(project || (project = {}));
//# sourceMappingURL=particleLineDrawer.js.map