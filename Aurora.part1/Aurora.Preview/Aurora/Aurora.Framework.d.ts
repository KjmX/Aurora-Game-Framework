declare module Kedjour.Aurora.Framework {
    class TimeSpan {
        private msecPerSecond;
        private msecPerMinute;
        private msecPerHour;
        private msecPerDay;
        private msecs;
        constructor(days: number, hours: number, minutes: number, seconds: number, milliseconds: number);
        static fromMilliseconds(milliseconds: number): TimeSpan;
        static fromSeconds(seconds: number): TimeSpan;
        static fromMinutes(minutes: number): TimeSpan;
        static fromHours(hours: number): TimeSpan;
        static fromDays(days: number): TimeSpan;
        static zero(): TimeSpan;
        addMilliseconds(milliseconds: number): void;
        addSeconds(seconds: number): void;
        addMinutes(minutes: number): void;
        addHours(hours: number): void;
        addDays(days: number): void;
        subtractMilliseconds(milliseconds: number): void;
        subtractSeconds(seconds: number): void;
        subtractMinutes(minutes: number): void;
        subtractHours(hours: number): void;
        subtractDays(days: number): void;
        equals(ts: TimeSpan): boolean;
        add(ts: TimeSpan): void;
        subtract(ts: TimeSpan): void;
        TotalMilliseconds: number;
        TotalSeconds: number;
        TotalMinutes: number;
        TotalHours: number;
        TotalDays: number;
        Milliseconds: number;
        Seconds: number;
        Minutes: number;
        Hours: number;
        Days: number;
    }
}
declare module Kedjour.Aurora.Framework {
    class GameTime {
        private elapsedGameTime;
        private totalGameTime;
        private isRunningSlowly;
        constructor();
        constructor(elapsedGameTime: TimeSpan, totalGameTime: TimeSpan, isRunningSlowly: boolean);
        ElapsedGameTime: TimeSpan;
        TotalGameTime: TimeSpan;
        IsRunningSlowly: boolean;
    }
}
declare module Kedjour.Aurora.Framework.Internal {
    class GameClock {
        private elapsedTime;
        private lastRealTime;
        private lastRealTimeValid;
        constructor();
        private getCurrentTime();
        reset(): void;
        step(): void;
        ElapsedTime: number;
    }
}
declare module Kedjour.Aurora.Framework.Internal {
    class RequestAnimationFrame {
        private game;
        private isRunning;
        private rafHandler;
        private stoHandler;
        constructor(game: Game);
        start(): void;
        stop(): void;
    }
}
declare module Kedjour.Aurora.Framework {
    enum TimeStepType {
        FixedTimeStep = 0,
        VariableTimeStep = 1,
    }
    class Game {
        private gameClock;
        private gameTime;
        private reqAnimationFrame;
        private targetElapsedTime;
        private totalGameTime;
        private lastElapsedGameTime;
        private accumulatedElapsedGameTime;
        private timeStep;
        private maxSkippedFrames;
        private forceElapsedTimeToZero;
        private drawRunningSlowly;
        protected maxFps: number;
        constructor();
        private drawFrame();
        resetElapsedTime(): void;
        run(): void;
        private runGame();
        private startGameLoop();
        tick(): void;
        protected initialize(): void;
        protected loadContent(): void;
        protected update(gameTime: GameTime): void;
        protected draw(gameTime: GameTime): void;
        MaxFps: number;
    }
}
