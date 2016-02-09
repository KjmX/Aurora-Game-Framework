///<summary>You shouldn't use Internal module objects, these objects are part of the internal framework implementation.</summary>
///<summary>Game time counter</summary>

module Aurora.Framework.Internal {
    export class GameClock {
        private elapsedTime: number;
        private lastRealTime: number;
        private lastRealTimeValid: boolean;

        constructor() {
            this.reset();
        }

        private getCurrentTime(): number {
            return performance.now();
        }

        public reset() {
            this.elapsedTime = 0;
            this.lastRealTimeValid = false;
        }

        public step() {
            // get the current time
            const currentTime = this.getCurrentTime();

            // check if this is the first step
            if (!this.lastRealTimeValid) {
                this.lastRealTime = currentTime;
                this.lastRealTimeValid = true;
            }

            // get the elapsed time
            this.elapsedTime = currentTime - this.lastRealTime;

            this.lastRealTime = currentTime;
        }

        public get ElapsedTime(): number {
            return this.elapsedTime;
        }
    }
}