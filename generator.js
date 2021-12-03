// const { Composite } = require("matter-js");
// const GameObjects = require("gameObjects");

class Generator {
    constructor(WIDTH_RATIO, WORLD_SCALE, FLOOR_HEIGHT) {
            this.seed = 1;
            this.world = Matter.Composite.create();
            // this.ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
            this.origin = { "x": 0, "y": 0 };
            this.ref = { "x": 500, "y": FLOOR_HEIGHT };
        } //WIDTH_RATIO * WORLD_SCALE * 0.5

    //creates world - test dummy at the moment
    getWorld() {
        // Matter.Composite.add(this.world, this.ground);

        var box = this.arch();
        // var box = this.stackArch(160, 160, 32);
        // var box = this.buildArches(80, 80, 10, 4, 2);
        // var box = this.compArch(80, 80, 8);
        // var box = this.createBoxes(80, 80, 8, 2, 2);

        this.translateGround(box);

        Matter.Composite.add(this.world, box);

        console.dir(this.world);

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


    arch(x = 0, y = 0) {
        let texture = Matter.Common.choose(["Glass/", "Metal/", "Stone/", "Wood/"]);
        let comp = Matter.Composite.create();
        let stack = Matter.Composites.stack(0, GameObjects.BLOCK_SIZE, 2, 2, 3 * GameObjects.BLOCK_SIZE, 0, (x, y) => {
            return GameObjects.rect(x, y, 1, 2, `images/Material Texture/${texture}`);
        })
        Matter.Composite.move(stack, Matter.Composite.allBodies(stack), comp);
        Matter.Composite.add(comp, GameObjects.rect(5 * GameObjects.BLOCK_SIZE / 2, GameObjects.BLOCK_SIZE / 2, 5, 1, `images/Material Texture/${texture}`))
        Matter.Composite.translate(comp, { x: x, y: y })
        return comp
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
        var top = Matter.Bodies.rectangle(0, 0, width, girth, { sleepThreshold: 10 });
        var left = Matter.Bodies.rectangle(-xoffset, yoffset, girth, (height - 2 * girth), { sleepThreshold: 10 });
        var right = Matter.Bodies.rectangle(xoffset, yoffset, girth, (height - 2 * girth), { sleepThreshold: 10 });

        Matter.Composite.add(arch, [top, left, right]);

        return arch;
    }




    

    stackArch(width, height, girth) {
        let xoffset = ((width - girth) / 2);
        let yoffset = ((height - girth) / 2);

        var arch = Matter.Composite.create();
        var top = Matter.Composites.stack(0, 0, 1, 1, 0, 0, function(x, y) {
            return Matter.Bodies.rectangle(x, y, width, girth, { "sleepThreshold": 10 });
        });
        Matter.Composite.move(top, Matter.Composite.allBodies(top), arch);
        var left = Matter.Composites.stack(0, girth, 1, 2, 0, 2, function(x, y) {
            return Matter.Bodies.rectangle(x, y, girth, (height - girth) / 2, { "sleepThreshold": 10 });
        });
        Matter.Composite.move(left, Matter.Composite.allBodies(left), arch);
        var right = Matter.Composites.stack((width - girth), girth, 1, 2, 0, 2, function(x, y) {
            return Matter.Bodies.rectangle(x, y, girth, (height - girth) / 2, { "sleepThreshold": 10 });
        });
        Matter.Composite.move(right, Matter.Composite.allBodies(right), arch);


        return arch;
    }


    rect(width, height) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (i == 0) {
                    if (width == 1) {
                        if (height == 1) {
                            //square 4-edge
                        } else if (j == 0) {
                            //top 3-edge
                        } else if (j == (height - 1)) {
                            //bottom 3-edge
                        } else {
                            //vertical 2-edge
                        }
                    } else if (height == 1) {
                        if (i == 0) {
                            //left 3-edge
                        } else if (i == (width - 1)) {
                            //right 3-edge
                        } else {
                            //horizontal 2-edge
                        }
                    } else if (j == 0) {
                        //top left corner
                    } else if (j == (height - 1)) {
                        //bottom left corner
                    } else {
                        //left edge
                    }
                } else if (i == (width - 1)) {
                    if (j == 0) {
                        //top right corner
                    } else if (j == (height - 1)) {
                        //bottom right corner
                    } else {
                        //right edge
                    }
                } else {
                    if (j == 0) {
                        //top edge
                    } else if (j == (height - 1)) {
                        //bottom edge
                    } else {
                        //empty
                    }
                }
            }
        }
    }



    createMap(scale) {

    }


}