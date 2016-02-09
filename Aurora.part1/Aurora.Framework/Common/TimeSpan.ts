module Aurora.Framework {
    export class TimeSpan {


        private msecPerSecond: number;
        private msecPerMinute: number;
        private msecPerHour: number;
        private msecPerDay: number;
        private msecs: number;

        // TODO: improve later, constructor overload
        constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number) {

            this.msecPerSecond = 1000;
            this.msecPerMinute = 60000;
            this.msecPerHour = 3600000;
            this.msecPerDay = 86400000;

            this.msecs = (days * this.msecPerDay) + (hours * this.msecPerHour) + (minutes * this.msecPerMinute) + (seconds * this.msecPerSecond) + milliseconds;
        }

        public static fromMilliseconds(milliseconds: number): TimeSpan {
            return new TimeSpan(0, 0, 0, 0, milliseconds);
        }

        public static fromSeconds(seconds: number): TimeSpan {
            return new TimeSpan(0, 0, 0, seconds, 0);
        }

        public static fromMinutes(minutes: number): TimeSpan {
            return new TimeSpan(0, 0, minutes, 0, 0);
        }

        public static fromHours(hours: number): TimeSpan {
            return new TimeSpan(0, hours, 0, 0, 0);
        }

        public static fromDays(days: number): TimeSpan {
            return new TimeSpan(days, 0, 0, 0, 0);
        }

        public static zero(): TimeSpan {
            return new TimeSpan(0, 0, 0, 0, 0);
        }

        public addMilliseconds(milliseconds: number) {
            this.msecs += milliseconds;
        }

        public addSeconds(seconds: number) {
            this.msecs += seconds * this.msecPerSecond;
        }

        public addMinutes(minutes: number) {
            this.msecs += minutes * this.msecPerMinute;
        }

        public addHours(hours: number) {
            this.msecs += hours * this.msecPerHour;
        }

        public addDays(days: number) {
            this.msecs += days * this.msecPerDay;
        }

        public subtractMilliseconds(milliseconds: number) {
            this.msecs -= milliseconds;
        }

        public subtractSeconds(seconds: number) {
            this.msecs -= seconds * this.msecPerSecond;
        }

        public subtractMinutes(minutes: number) {
            this.msecs -= minutes * this.msecPerMinute;
        }

        public subtractHours(hours: number) {
            this.msecs -= hours * this.msecPerHour;
        }

        public subtractDays(days: number) {
            this.msecs -= days * this.msecPerDay;
        }

        public equals(ts: TimeSpan): boolean {
            return this.msecs === ts.TotalMilliseconds;
        }

        public add(ts: TimeSpan) {
            this.msecs += ts.TotalMilliseconds;
        }

        public subtract(ts: TimeSpan) {
            this.msecs -= ts.TotalMilliseconds;
        }

        public get TotalMilliseconds(): number {
            return this.msecs;
        }

        public get TotalSeconds(): number {
            return this.msecs / this.msecPerSecond;
        }

        public get TotalMinutes(): number {
            return this.msecs / this.msecPerMinute;
        }

        public get TotalHours(): number {
            return this.msecs / this.msecPerHour;
        }

        public get TotalDays(): number {
            return this.msecs / this.msecPerHour;
        }

        // Milliseconds are the remaining milliseconds, that don't form a whole second. 
        public get Milliseconds(): number {
            return this.msecs % 1000;   // 1000 is the number of milliseconds per second
        }

        // Seconds are the remaining seconds, that don't form a whole minute
        public get Seconds(): number {
            return Math.floor(this.msecs / this.msecPerSecond) % 60;
        }

        // Minutes that don't form a whole hour
        public get Minutes(): number {
            return Math.floor(this.msecs / this.msecPerMinute) % 60;
        }

        // Hours that don't form a whole day
        public get Hours(): number {
            return Math.floor(this.msecs / this.msecPerHour) % 24;
        }

        public get Days(): number {
            return Math.floor(this.msecs / this.msecPerDay);
        }

    }
}