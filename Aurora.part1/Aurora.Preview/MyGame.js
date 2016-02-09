/// <reference path="Aurora/Aurora.Framework.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Aurora;
(function (Aurora) {
    var Preview;
    (function (Preview) {
        var MyGame = (function (_super) {
            __extends(MyGame, _super);
            function MyGame() {
                _super.call(this);
            }
            MyGame.prototype.initialize = function () {
                console.log("initialize()");
            };
            MyGame.prototype.loadContent = function () { };
            MyGame.prototype.update = function (gameTime) {
                console.log("update() => " + gameTime.ElapsedGameTime.TotalMilliseconds);
            };
            MyGame.prototype.draw = function (gameTime) {
                console.log("draw() => " + gameTime.ElapsedGameTime.TotalMilliseconds);
            };
            return MyGame;
        })(Aurora.Framework.Game);
        Preview.MyGame = MyGame;
    })(Preview = Aurora.Preview || (Aurora.Preview = {}));
})(Aurora || (Aurora = {}));
//# sourceMappingURL=MyGame.js.map