/// <reference path="Aurora/Aurora.Framework.d.ts"/>

module Aurora.Preview {

    import Aurora = Kedjour.Aurora.Framework;

    export class MyGame extends Aurora.Game {
        
        constructor() {
            super();
        }

        protected initialize() {
            console.log("initialize()");
        }

        protected loadContent() { }

        protected update(gameTime: Aurora.GameTime) {
            console.log(`update() => ${gameTime.ElapsedGameTime.TotalMilliseconds}`);
        }

        protected draw(gameTime: Aurora.GameTime) {
            console.log(`draw() => ${gameTime.ElapsedGameTime.TotalMilliseconds}`);
        }

    }
}