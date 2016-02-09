/// <reference path="Aurora/Aurora.Framework.d.ts"/>

module Aurora.Preview {
    
    export class MyGame extends Aurora.Framework.Game {
        
        constructor() {
            super();
        }

        protected initialize() {
            console.log("initialize()");
        }

        protected loadContent() { }

        protected update(gameTime: Aurora.Framework.GameTime) {
            console.log(`update() => ${gameTime.ElapsedGameTime.TotalMilliseconds}`);
        }

        protected draw(gameTime: Aurora.Framework.GameTime) {
            console.log(`draw() => ${gameTime.ElapsedGameTime.TotalMilliseconds}`);
        }

    }
}