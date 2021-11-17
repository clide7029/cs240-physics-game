// const { Bodies } = require("matter-js");

class Game {
    constructor() {
        this.bodies = Matter.Bodies;
        // this.composite = Matter.Composite;
        this.engine = Matter.Engine.create();
        this.renderer = Matter.Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                showDebug: true,
            }
        });

        this.ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        Matter.Composite.add(this.engine.world, [this.ground]);

        Matter.Render.run(this.renderer);
        Matter.Runner.run(this.engine);
    }


    createGrid() {
        let block = Matter.Composite.create();

        var grid = Matter.Composites.stack(100, 100, 5, 3, 0, 0, function(x, y) {
            return this.bodies.rectangle(x, y, 20, 20);
        });


        // for (let i = 1; i < 3; i++) {
        //     let obj = this.bodies.rectangle(i * 10, 0, 10, 30);
        //     Matter.Composite.add(block, obj);
        // }


        // Matter.Composite.mesh(block, 2, 2);

        Matter.Composite.add(this.engine.world, grid);
    }

}