// TODO: recheck this class (maybe throw exceptions when the value is undefined)

/// <reference path="../Common/TimeSpan.ts"/>

module Aurora.Framework {
    export class GameTime {
        private elapsedGameTime: TimeSpan;
        private totalGameTime: TimeSpan;
        private isRunningSlowly: boolean;

        constructor();
        constructor(elapsedGameTime: TimeSpan, totalGameTime: TimeSpan, isRunningSlowly: boolean);
        constructor(elapsedGameTime?: TimeSpan, totalGameTime?: TimeSpan, isRunningSlowly?: boolean) {
            this.elapsedGameTime = elapsedGameTime || TimeSpan.zero();
            this.totalGameTime = totalGameTime || TimeSpan.zero();
            this.isRunningSlowly = isRunningSlowly || false;
        }

        public get ElapsedGameTime(): TimeSpan {
            return this.elapsedGameTime;
        }

        public set ElapsedGameTime(value: TimeSpan) {
            if (value !== undefined)
                this.elapsedGameTime = value;
        }

        public get TotalGameTime(): TimeSpan {
            return this.totalGameTime;
        }

        public set TotalGameTime(value: TimeSpan) {
            if (value !== undefined)
                this.totalGameTime = value;
        }

        public get IsRunningSlowly(): boolean {
            return this.isRunningSlowly;
        }

        public set IsRunningSlowly(value: boolean) {
            if (value !== undefined)
                this.isRunningSlowly = value;
        }
    }
}