///<summary>Request the animation frame update from the browser, most of the game loop is located here.</summary>

///<reference path="Game.ts"/>

module Aurora.Framework.Internal {

    class AnimationFrameHandler {
        protected successor: AnimationFrameHandler;
        protected game: Game;
        protected requestId: number; // id returned by window.requestAnimationFrame and window.setTimeout, USAGE: to cancel the animation frame

        constructor(game: Game) {
            this.successor = undefined;
            this.game = game;
        }

        public setSuccessor(successor: AnimationFrameHandler) {
            this.successor = successor;
        }

        public update() { }

        public cancel() { }
    }

    class RequestAnimationFrameHandler extends AnimationFrameHandler {

        constructor(game: Game) {
            super(game);

            var vendors = ["ms", "moz", "webkit", "o"];
            for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
                window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"] ||
                                              window[vendors[i] + "CancelRequestAnimationFrame"];
            }

        }

        public update() {
            if (window.requestAnimationFrame) {
                this.requestId = window.requestAnimationFrame(this.updateRaf.bind(this));
            } else if (this.successor !== undefined) {
                this.successor.update();
            }
        }

        // to gain some performance
        private updateRaf(timestamp) {
            this.game.tick();
            this.requestId = window.requestAnimationFrame(this.updateRaf.bind(this));
        }

        public cancel() {
            if (window.requestAnimationFrame) {
                window.cancelAnimationFrame(this.requestId);
            } else if (this.successor !== undefined) {
                this.successor.cancel();
            }
        }
    }

    class TimeoutHandler extends AnimationFrameHandler {

        private callTime: number;

        constructor(game: Game) {
            super(game);

            this.callTime = 1000 / this.game.MaxFps;
        }

        public update() {
            if (!window.requestAnimationFrame) {
                this.requestId = window.setTimeout(this.updateSto.bind(this), this.callTime);
            } else if (this.successor !== undefined) {
                this.successor.update();
            }
        }

        // gaining some performance (tiny one)
        private updateSto() {
            this.game.tick();
            this.requestId = window.setTimeout(this.updateSto.bind(this), this.callTime);
        }

        public cancel() {
            if (!window.requestAnimationFrame) {
                window.clearTimeout(this.requestId);
            } else if (this.successor !== undefined) {
                this.successor.cancel();
            }
        }
    }

    export class RequestAnimationFrame {
        private game: Game;
        private isRunning: boolean;
        private rafHandler: AnimationFrameHandler;
        private stoHandler: AnimationFrameHandler;

        constructor(game: Game) {
            this.game = game;
            this.isRunning = false;
            this.rafHandler = new RequestAnimationFrameHandler(this.game);
            this.stoHandler = new TimeoutHandler(this.game);

            this.rafHandler.setSuccessor(this.stoHandler);
        }

        public start() {
            if (this.isRunning) return;

            this.isRunning = true;
            this.rafHandler.update();
        }

        public stop() {
            this.isRunning = false;
            this.rafHandler.cancel();
        }
    }
}