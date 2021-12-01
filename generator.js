// const { Composite } = require("matter-js");

class Generator {
    constructor() {
        this.world = Matter.Composite.create();
        this.ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        this.origin = { "x": 0, "y": 0 };
        this.ref = { "x": 400, "y": 580 };
    }

    //creates world - test dummy at the moment
    getWorld() {
        Matter.Composite.add(this.world, this.ground);

        var box = this.buildArches(80, 80, 10, 2, 2);
        // var box = this.compArch(80, 80, 8);
        // var box = this.createBoxes(80, 80, 8, 2, 2);

        // this.translateGround(box);

        Matter.Composite.add(this.world, box);

        return this.world;
    }

    //translate an input composite to the ground reference
    translateGround(composite) {

        let bound = Matter.Composite.bounds(composite).max;
        bound.x = 0;

        let spawn = Matter.Vector.sub(this.ref, bound);

        Matter.Composite.translate(composite, spawn, true);

        return composite;
    }

    //create a grid of arches
    createArches(width, height, girth, row, col) {

        let xoffset = ((width - girth) / 2);
        let yoffset = ((height - girth) / 2);

        var grid = Matter.Composites.stack(0, 0, row, col, 0, 0, function(x, y) {
            var partA = Matter.Bodies.rectangle(xoffset, yoffset, width, girth);
            var part1 = Matter.Bodies.rectangle(xoffset, girth + yoffset, girth, (height - 2 * girth));
            var part2 = Matter.Bodies.rectangle(xoffset, girth + yoffset, girth, (height - 2 * girth));

            var arch = Matter.Composite.create();
            Matter.Composite.add(arch, [partA, part1, part2]);
            arch.bounds = Matter.Composite.bounds(arch);
            console.dir(arch);
            return arch;

        });

        return grid;
    }

    //create a grid of boxes
    createBoxes(width, height, girth, row, col) {

        let xoffset = ((width - girth) / 2);
        let yoffset = ((height - girth) / 2);

        var grid = Matter.Composites.stack(0, 0, row, col, 0, 0, function(x, y) {
            var partA = Matter.Bodies.rectangle(x, y, width, girth);
            var part1 = Matter.Bodies.rectangle(x - xoffset, y + yoffset, girth, (height - 2 * girth));
            var partB = Matter.Bodies.rectangle(x, y + yoffset * 2, width, girth);
            var part2 = Matter.Bodies.rectangle(x + xoffset, y + yoffset, girth, (height - 2 * girth));

            return Matter.Body.create({
                parts: [partA, partB, part1, part2]
            });

        });

        return grid;
    }

    //create a grid of columms
    createColumns(height, girth, spacing, row, col) {

        var columns = Matter.Composites.stack(0, 0, row, col, spacing, 1, function(x, y) {
            return Matter.Bodies.rectangle(x, y, girth, height);
        });
        return columns;
    }

    buildArches(width, height, girth, row, col) {
        var grid = Matter.Composite.create();
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let temp = this.compArch(width, height, girth);
                Matter.Composite.translate(temp, { "x": (i * width), "y": (j * height) });
                Matter.Composite.add(grid, temp);
            }
        }

        return grid;
    }


    compArch(width, height, girth) {
        let xoffset = ((width - girth) / 2);
        let yoffset = ((height - girth) / 2);

        var arch = Matter.Composite.create();
        var top = Matter.Bodies.rectangle(0, 0, width, girth);
        var left = Matter.Bodies.rectangle(-xoffset, yoffset, girth, (height - 2 * girth));
        var right = Matter.Bodies.rectangle(xoffset, yoffset, girth, (height - 2 * girth));

        Matter.Composite.add(arch, [top, left, right]);

        return arch;
    }



}