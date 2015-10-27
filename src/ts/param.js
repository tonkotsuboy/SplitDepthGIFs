var project;
(function (project) {
    /**
     * プロジェクト内で使う各値を管理するクラス
     */
    var Param = (function () {
        function Param() {
        }
        /** SEの数 */
        Param.SE_NUM = 21;
        /** SEとSEの間隔 */
        Param.SE_STEP = 4000;
        /** 各SEの長さ */
        Param.SE_DURATION = 2600;
        /** 同時に鳴らす音の数 */
        Param.SOUNDS_CHANNEL = 50;
        /** 音ファイルのフォルダ */
        Param.SOUNDS_FOLDER = "sounds/";
        /** BGMの長さ */
        Param.BGM_DURATION = 16 * 1000;
        /** BGのID */
        Param.BGM_ID = "bgm";
        /** iOSかどうか */
        Param.isIOS = false;
        /** Androidかどうか */
        Param.isAndroid = false;
        /** HTMLAudioかどうか */
        Param.isHTMLAudio = false;
        /** ローパフォーマンスモードかどうか */
        Param.lowPerformance = false;
        return Param;
    })();
    project.Param = Param;
})(project || (project = {}));
//# sourceMappingURL=param.js.map