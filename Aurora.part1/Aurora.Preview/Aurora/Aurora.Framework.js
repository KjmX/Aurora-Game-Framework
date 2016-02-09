var Aurora;
(function (Aurora) {
    var Framework;
    (function (Framework) {
        var TimeSpan = (function () {
            // TODO: improve later, constructor overload
            function TimeSpan(days, hours, minutes, seconds, milliseconds) {
                this.msecPerSecond = 1000;
                this.msecPerMinute = 60000;
                this.msecPerHour = 3600000;
                this.msecPerDay = 86400000;
                this.msecs = (days * this.msecPerDay) + (hours * this.msecPerHour) + (minutes * this.msecPerMinute) + (seconds * this.msecPerSecond) + milliseconds;
            }
            TimeSpan.fromMilliseconds = function (milliseconds) {
                return new TimeSpan(0, 0, 0, 0, milliseconds);
            };
            TimeSpan.fromSeconds = function (seconds) {
                return new TimeSpan(0, 0, 0, seconds, 0);
            };
            TimeSpan.fromMinutes = function (minutes) {
                return new TimeSpan(0, 0, minutes, 0, 0);
            };
            TimeSpan.fromHours = function (hours) {
                return new TimeSpan(0, hours, 0, 0, 0);
            };
            TimeSpan.fromDays = function (days) {
                return new TimeSpan(days, 0, 0, 0, 0);
            };
            TimeSpan.zero = function () {
                return new TimeSpan(0, 0, 0, 0, 0);
            };
            TimeSpan.prototype.addMilliseconds = function (milliseconds) {
                this.msecs += milliseconds;
            };
            TimeSpan.prototype.addSeconds = function (seconds) {
                this.msecs += seconds * this.msecPerSecond;
            };
            TimeSpan.prototype.addMinutes = function (minutes) {
                this.msecs += minutes * this.msecPerMinute;
            };
            TimeSpan.prototype.addHours = function (hours) {
                this.msecs += hours * this.msecPerHour;
            };
            TimeSpan.prototype.addDays = function (days) {
                this.msecs += days * this.msecPerDay;
            };
            TimeSpan.prototype.subtractMilliseconds = function (milliseconds) {
                this.msecs -= milliseconds;
            };
            TimeSpan.prototype.subtractSeconds = function (seconds) {
                this.msecs -= seconds * this.msecPerSecond;
            };
            TimeSpan.prototype.subtractMinutes = function (minutes) {
                this.msecs -= minutes * this.msecPerMinute;
            };
            TimeSpan.prototype.subtractHours = function (hours) {
                this.msecs -= hours * this.msecPerHour;
            };
            TimeSpan.prototype.subtractDays = function (days) {
                this.msecs -= days * this.msecPerDay;
            };
            TimeSpan.prototype.equals = function (ts) {
                return this.msecs === ts.TotalMilliseconds;
            };
            TimeSpan.prototype.add = function (ts) {
                this.msecs += ts.TotalMilliseconds;
            };
            TimeSpan.prototype.subtract = function (ts) {
                this.msecs -= ts.TotalMilliseconds;
            };
            Object.defineProperty(TimeSpan.prototype, "TotalMilliseconds", {
                get: function () {
                    return this.msecs;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "TotalSeconds", {
                get: function () {
                    return this.msecs / this.msecPerSecond;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "TotalMinutes", {
                get: function () {
                    return this.msecs / this.msecPerMinute;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "TotalHours", {
                get: function () {
                    return this.msecs / this.msecPerHour;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "TotalDays", {
                get: function () {
                    return this.msecs / this.msecPerHour;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "Milliseconds", {
                // Milliseconds are the remaining milliseconds, that don't form a whole second. 
                get: function () {
                    return this.msecs % 1000; // 1000 is the number of milliseconds per second
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "Seconds", {
                // Seconds are the remaining seconds, that don't form a whole minute
                get: function () {
                    return Math.floor(this.msecs / this.msecPerSecond) % 60;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "Minutes", {
                // Minutes that don't form a whole hour
                get: function () {
                    return Math.floor(this.msecs / this.msecPerMinute) % 60;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "Hours", {
                // Hours that don't form a whole day
                get: function () {
                    return Math.floor(this.msecs / this.msecPerHour) % 24;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeSpan.prototype, "Days", {
                get: function () {
                    return Math.floor(this.msecs / this.msecPerDay);
                },
                enumerable: true,
                configurable: true
            });
            return TimeSpan;
        })();
        Framework.TimeSpan = TimeSpan;
    })(Framework = Aurora.Framework || (Aurora.Framework = {}));
})(Aurora || (Aurora = {}));
// TODO: recheck this class (maybe throw exceptions when the value is undefined)
/// <reference path="../Common/TimeSpan.ts"/>
var Aurora;
(function (Aurora) {
    var Framework;
    (function (Framework) {
        var GameTime = (function () {
            function GameTime(elapsedGameTime, totalGameTime, isRunningSlowly) {
                this.elapsedGameTime = elapsedGameTime || Framework.TimeSpan.zero();
                this.totalGameTime = totalGameTime || Framework.TimeSpan.zero();
                this.isRunningSlowly = isRunningSlowly || false;
            }
            Object.defineProperty(GameTime.prototype, "ElapsedGameTime", {
                get: function () {
                    return this.elapsedGameTime;
                },
                set: function (value) {
                    if (value !== undefined)
                        this.elapsedGameTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GameTime.prototype, "TotalGameTime", {
                get: function () {
                    return this.totalGameTime;
                },
                set: function (value) {
                    if (value !== undefined)
                        this.totalGameTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GameTime.prototype, "IsRunningSlowly", {
                get: function () {
                    return this.isRunningSlowly;
                },
                set: function (value) {
                    if (value !== undefined)
                        this.isRunningSlowly = value;
                },
                enumerable: true,
                configurable: true
            });
            return GameTime;
        })();
        Framework.GameTime = GameTime;
    })(Framework = Aurora.Framework || (Aurora.Framework = {}));
})(Aurora || (Aurora = {}));
///<summary>You shouldn't use Internal module objects, these objects are part of the internal framework implementation.</summary>
///<summary>Game time counter</summary>
var Aurora;
(function (Aurora) {
    var Framework;
    (function (Framework) {
        var Internal;
        (function (Internal) {
            var GameClock = (function () {
                function GameClock() {
                    this.reset();
                }
                GameClock.prototype.getCurrentTime = function () {
                    return performance.now();
                };
                GameClock.prototype.reset = function () {
                    this.elapsedTime = 0;
                    this.lastRealTimeValid = false;
                };
                GameClock.prototype.step = function () {
                    // get the current time
                    var currentTime = this.getCurrentTime();
                    // check if this is the first step
                    if (!this.lastRealTimeValid) {
                        this.lastRealTime = currentTime;
                        this.lastRealTimeValid = true;
                    }
                    // get the elapsed time
                    this.elapsedTime = currentTime - this.lastRealTime;
                    this.lastRealTime = currentTime;
                };
                Object.defineProperty(GameClock.prototype, "ElapsedTime", {
                    get: function () {
                        return this.elapsedTime;
                    },
                    enumerable: true,
                    configurable: true
                });
                return GameClock;
            })();
            Internal.GameClock = GameClock;
        })(Internal = Framework.Internal || (Framework.Internal = {}));
    })(Framework = Aurora.Framework || (Aurora.Framework = {}));
})(Aurora || (Aurora = {}));
///<summary>Request the animation frame update from the browser, most of the game loop is located here.</summary>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="Game.ts"/>
var Aurora;
(function (Aurora) {
    var Framework;
    (function (Framework) {
        var Internal;
        (function (Internal) {
            var AnimationFrameHandler = (function () {
                function AnimationFrameHandler(game) {
                    this.successor = undefined;
                    this.game = game;
                }
                AnimationFrameHandler.prototype.setSuccessor = function (successor) {
                    this.successor = successor;
                };
                AnimationFrameHandler.prototype.update = function () { };
                AnimationFrameHandler.prototype.cancel = function () { };
                return AnimationFrameHandler;
            })();
            var RequestAnimationFrameHandler = (function (_super) {
                __extends(RequestAnimationFrameHandler, _super);
                function RequestAnimationFrameHandler(game) {
                    _super.call(this, game);
                    var vendors = ["ms", "moz", "webkit", "o"];
                    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
                        window.requestAnimationFrame = window[vendors[i] + "RequestAnimationFrame"];
                        window.cancelAnimationFrame = window[vendors[i] + "CancelAnimationFrame"] ||
                            window[vendors[i] + "CancelRequestAnimationFrame"];
                    }
                }
                RequestAnimationFrameHandler.prototype.update = function () {
                    if (window.requestAnimationFrame) {
                        this.requestId = window.requestAnimationFrame(this.updateRaf.bind(this));
                    }
                    else if (this.successor !== undefined) {
                        this.successor.update();
                    }
                };
                // to gain some performance
                RequestAnimationFrameHandler.prototype.updateRaf = function (timestamp) {
                    this.game.tick();
                    this.requestId = window.requestAnimationFrame(this.updateRaf.bind(this));
                };
                RequestAnimationFrameHandler.prototype.cancel = function () {
                    if (window.requestAnimationFrame) {
                        window.cancelAnimationFrame(this.requestId);
                    }
                    else if (this.successor !== undefined) {
                        this.successor.cancel();
                    }
                };
                return RequestAnimationFrameHandler;
            })(AnimationFrameHandler);
            var TimeoutHandler = (function (_super) {
                __extends(TimeoutHandler, _super);
                function TimeoutHandler(game) {
                    _super.call(this, game);
                    this.callTime = 1000 / this.game.MaxFps;
                }
                TimeoutHandler.prototype.update = function () {
                    if (!window.requestAnimationFrame) {
                        this.requestId = window.setTimeout(this.updateSto.bind(this), this.callTime);
                    }
                    else if (this.successor !== undefined) {
                        this.successor.update();
                    }
                };
                // gaining some performance (tiny one)
                TimeoutHandler.prototype.updateSto = function () {
                    this.game.tick();
                    this.requestId = window.setTimeout(this.updateSto.bind(this), this.callTime);
                };
                TimeoutHandler.prototype.cancel = function () {
                    if (!window.requestAnimationFrame) {
                        window.clearTimeout(this.requestId);
                    }
                    else if (this.successor !== undefined) {
                        this.successor.cancel();
                    }
                };
                return TimeoutHandler;
            })(AnimationFrameHandler);
            var RequestAnimationFrame = (function () {
                function RequestAnimationFrame(game) {
                    this.game = game;
                    this.isRunning = false;
                    this.rafHandler = new RequestAnimationFrameHandler(this.game);
                    this.stoHandler = new TimeoutHandler(this.game);
                    this.rafHandler.setSuccessor(this.stoHandler);
                }
                RequestAnimationFrame.prototype.start = function () {
                    if (this.isRunning)
                        return;
                    this.isRunning = true;
                    this.rafHandler.update();
                };
                RequestAnimationFrame.prototype.stop = function () {
                    this.isRunning = false;
                    this.rafHandler.cancel();
                };
                return RequestAnimationFrame;
            })();
            Internal.RequestAnimationFrame = RequestAnimationFrame;
        })(Internal = Framework.Internal || (Framework.Internal = {}));
    })(Framework = Aurora.Framework || (Aurora.Framework = {}));
})(Aurora || (Aurora = {}));
/// <reference path="GameTime.ts"/>
/// <reference path="GameClock.ts"/>
/// <reference path="RequestAnimationFrame.ts"/>
var Aurora;
(function (Aurora) {
    var Framework;
    (function (Framework) {
        var GameClock = Aurora.Framework.Internal.GameClock;
        var RequestAnimationFrame = Aurora.Framework.Internal.RequestAnimationFrame;
        (function (TimeStepType) {
            TimeStepType[TimeStepType["FixedTimeStep"] = 0] = "FixedTimeStep";
            TimeStepType[TimeStepType["VariableTimeStep"] = 1] = "VariableTimeStep";
        })(Framework.TimeStepType || (Framework.TimeStepType = {}));
        var TimeStepType = Framework.TimeStepType;
        var Game = (function () {
            function Game() {
                this.gameClock = new GameClock();
                this.gameTime = new Framework.GameTime();
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
            Game.prototype.drawFrame = function () {
                this.gameTime.ElapsedGameTime = Framework.TimeSpan.fromMilliseconds(this.lastElapsedGameTime);
                this.gameTime.TotalGameTime = Framework.TimeSpan.fromMilliseconds(this.totalGameTime);
                this.gameTime.IsRunningSlowly = this.drawRunningSlowly;
                this.draw(this.gameTime);
                this.lastElapsedGameTime = 0;
            };
            Game.prototype.resetElapsedTime = function () {
                this.forceElapsedTimeToZero = true;
                this.drawRunningSlowly = false;
            };
            Game.prototype.run = function () {
                this.runGame();
            };
            Game.prototype.runGame = function () {
                try {
                    this.initialize();
                    this.startGameLoop();
                }
                catch (e) {
                }
            };
            Game.prototype.startGameLoop = function () {
                this.reqAnimationFrame.start();
            };
            Game.prototype.tick = function () {
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
                        this.gameTime.ElapsedGameTime = Framework.TimeSpan.fromMilliseconds(this.targetElapsedTime);
                        this.gameTime.TotalGameTime = Framework.TimeSpan.fromMilliseconds(this.totalGameTime);
                        this.gameTime.IsRunningSlowly = this.drawRunningSlowly;
                        this.update(this.gameTime);
                        this.lastElapsedGameTime += this.targetElapsedTime;
                        this.totalGameTime += this.targetElapsedTime;
                        if (++numOfUpdates > this.maxSkippedFrames) {
                            this.resetElapsedTime();
                            break;
                        }
                    }
                }
                else if (this.timeStep === TimeStepType.VariableTimeStep) {
                    this.lastElapsedGameTime = elapsedTime;
                    this.drawRunningSlowly = false;
                    this.gameTime.ElapsedGameTime = Framework.TimeSpan.fromMilliseconds(this.lastElapsedGameTime);
                    this.gameTime.TotalGameTime = Framework.TimeSpan.fromMilliseconds(this.totalGameTime);
                    this.gameTime.IsRunningSlowly = false;
                    this.update(this.gameTime);
                    this.totalGameTime += elapsedTime;
                }
                this.drawFrame();
            };
            // virtual protected methods
            Game.prototype.initialize = function () { };
            Game.prototype.loadContent = function () { };
            Game.prototype.update = function (gameTime) { };
            Game.prototype.draw = function (gameTime) { };
            Object.defineProperty(Game.prototype, "MaxFps", {
                // properties
                get: function () {
                    return this.maxFps;
                },
                enumerable: true,
                configurable: true
            });
            return Game;
        })();
        Framework.Game = Game;
    })(Framework = Aurora.Framework || (Aurora.Framework = {}));
})(Aurora || (Aurora = {}));
//# sourceMappingURL=Aurora.Framework.js.map