/// <reference path="../../typings/soundjs/soundjs.d.ts" />
/// <reference path="../main.ts" />
var project;
(function (project) {
    /**
     * ローディングバーを進めるタスク
     */
    var ProgressLoadingBarTask = (function () {
        function ProgressLoadingBarTask(main) {
            this._main = main;
            this._progressBarLayer = document.getElementById("progressBarLayer");
            this._progressBar = document.getElementById("progressBar");
        }
        ProgressLoadingBarTask.prototype.update = function (progress) {
            var percent = progress * 100;
            this._progressBar.style.width = percent + "%";
        };
        ProgressLoadingBarTask.prototype.completeHandler = function () {
            var _this = this;
            setTimeout(function () {
                _this._progressBar.style.opacity = "0";
                _this._progressBarLayer.className = "on";
                _this._progressBarLayer.addEventListener("click", function () { return _this.playButtonTapHandler(); });
            }, 100);
        };
        ProgressLoadingBarTask.prototype.playButtonTapHandler = function () {
            var _this = this;
            createjs.Sound.play(project.Param.BGM_ID, { loop: -1, pan: 0.01 });
            this._progressBarLayer.className = "";
            setTimeout(function () {
                document.body.removeChild(_this._progressBarLayer);
            }, 100);
            this._main.start();
        };
        return ProgressLoadingBarTask;
    })();
    project.ProgressLoadingBarTask = ProgressLoadingBarTask;
})(project || (project = {}));
//# sourceMappingURL=progressLoadingBarTask.js.map