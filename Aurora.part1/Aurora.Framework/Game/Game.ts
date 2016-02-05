/// <reference path="GameTime.ts"/>
/// <reference path="GameClock.ts"/>
/// <reference path="RequestAnimationFrame.ts"/>

module Kedjour.Aurora.Framework {

    import GameClock = Kedjour.Aurora.Framework.Internal.GameClock;
    import RequestAnimationFrame = Kedjour.Aurora.Framework.Internal.RequestAnimationFrame;

    export enum TimeStepType {
        FixedTimeStep,
        VariableTimeStep
    }

    export class Game {

        private gameClock: GameClock;
        private gameTime: GameTime;
        private reqAnimationFrame: RequestAnimationFrame;
        private targetElapsedTime: number;
        private totalGameTime: number;
        private lastElapsedGameTime: number;
        private accumulatedElapsedGameTime: number;
        private timeStep: TimeStepType;
        private maxSkippedFrames: number;
        private forceElapsedTimeToZero: boolean;
        private drawRunningSlowly: boolean;

        protected maxFps: number;

        constructor() {
            this.gameClock = new GameClock();
            this.gameTime = new GameTime();
            this.maxFps = 60;
            this.targetElapsedTime = 1000 / this.maxFps;
            this.totalGameTime = 0;
            this.lastElapsedGameTime = 0;
            this.accumulatedElapsedGameTime = 0;
            this.timeStep = TimeStepType.FixedTimeStep;
            this.maxSkippedFrames = 120;
            this.forceElapsedTimeToZero = false;
            this.drawRunningSlowly = false;
            this.reqAnimationFrame = new RequestAnimationFrame(this);
        }

        private drawFrame() {
            this.gameTime.ElapsedGameTime = TimeSpan.fromMilliseconds(this.lastElapsedGameTime);
            this.gameTime.TotalGameTime = TimeSpan.fromMilliseconds(this.totalGameTime);
            this.gameTime.IsRunningSlowly = this.drawRunningSlowly;
            this.draw(this.gameTime);
            this.lastElapsedGameTime = 0;
        }

        public resetElapsedTime() {
            this.forceElapsedTimeToZero = true;
            this.drawRunningSlowly = false;
        }

        public run() {
            this.runGame();
        }

        private runGame() {
            try {
                this.initialize();
                this.startGameLoop();
            } catch (e) {
                // TODO: we'll catch stuff here in the future
            }
        }

        private startGameLoop() {
            this.reqAnimationFrame.start();
        }

        public tick() {
            this.gameClock.step();
            var elapsedTime = this.gameClock.ElapsedTime; // in milliseconds
            if (this.forceElapsedTimeToZero) {
                elapsedTime = 0;
                this.forceElapsedTimeToZero = false;
            }

            if (this.timeStep === TimeStepType.FixedTimeStep) {
                this.accumulatedElapsedGameTime += elapsedTime;

                // we are running faster than the specified FPS...
                if (this.accumulatedElapsedGameTime < this.targetElapsedTime) {
                    return;
                }

                // but what if we are running slower than the wanted FPS?
                // the solution is to call multiple update() before drawing to keep up
                // with the target elapsed time.

                var accumulatedTime = this.accumulatedElapsedGameTime;
                this.drawRunningSlowly = (this.accumulatedElapsedGameTime / this.targetElapsedTime) > 1;

                // actually we know how many times update() will be called, by just doing accumulatedElapsedGameTime / targetElapsedTime
                // but since we gonna loop on the integer part we will miss some ticks, so we need to collect those extra ticks and save them to the
                // next round. Mod operation will do the trick.
                this.accumulatedElapsedGameTime = this.accumulatedElapsedGameTime % this.targetElapsedTime;

                var numOfUpdates = 0;

                while (accumulatedTime >= this.targetElapsedTime) {

                    accumulatedTime -= this.targetElapsedTime;
                    this.gameTime.ElapsedGameTime = TimeSpan.fromMilliseconds(this.targetElapsedTime);
                    this.gameTime.TotalGameTime = TimeSpan.fromMilliseconds(this.totalGameTime);
                    this.gameTime.IsRunningSlowly = this.drawRunningSlowly;
                    this.update(this.gameTime);

                    this.lastElapsedGameTime += this.targetElapsedTime;
                    this.totalGameTime += this.targetElapsedTime;

                    if (++numOfUpdates > this.maxSkippedFrames) {
                        this.resetElapsedTime();
                        break;
                    }
                }
            } else if (this.timeStep === TimeStepType.VariableTimeStep) {
                this.lastElapsedGameTime = elapsedTime;
                this.drawRunningSlowly = false;
                this.gameTime.ElapsedGameTime = TimeSpan.fromMilliseconds(this.lastElapsedGameTime);
                this.gameTime.TotalGameTime = TimeSpan.fromMilliseconds(this.totalGameTime);
                this.gameTime.IsRunningSlowly = false;
                this.update(this.gameTime);
                this.totalGameTime += elapsedTime;
            }

            this.drawFrame();
        }

        // virtual protected methods
        protected initialize() { }

        protected loadContent() { }

        protected update(gameTime: GameTime) { }

        protected draw(gameTime: GameTime) { }

        // properties
        public get MaxFps(): number {
            return this.maxFps;
        }
    }
}