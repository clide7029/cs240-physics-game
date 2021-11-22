// const { Bodies } = require("matter-js");

class Game {
    constructor() {
        this.bodies = Matter.Bodies;
        // this.composite = Matter.Composite;
        this.generator = new Generator();
        //add mouse constraint
        this.engine = Matter.Engine.create();
        this.renderer = Matter.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                showDebug: true
            }
        });

        Matter.Composite.add(this.engine.world, this.generator.getWorld());

        Matter.Render.run(this.renderer);
        Matter.Runner.run(this.engine);
    }
}