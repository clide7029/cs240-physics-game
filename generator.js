class Generator {
    constructor() {
        this.world = Matter.Composite.create();
        this.ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        this.origin = { "x": 0, "y": 0 };
        this.ref = { "x": 400, "y": 580 };
        this.xref = 400;
        this.yref = 580;
    }

    getRandomWall() {
        let rand = Math.floor(Math.random() * 4);
        switch (rand) {
            case 0:
                return new wall(rand);
        }
    }

    getWorld() {
        console.log(this.ground);
        Matter.Composite.add(this.world, this.ground);

        var box = this.createBox(60, 100, 10);
        // var box = this.createTower();

        this.translateGround(box);

        Matter.Composite.add(this.world, box);

        return this.world;
    }

    translateGround(composite) {

        let bound = Matter.Composite.bounds(composite).max;
        bound.x = 0;
        console.dir(this.ref);
        console.dir(bound);


        let spawn = Matter.Vector.sub(this.ref, bound);
        console.dir(spawn);

        Matter.Composite.translate(composite, spawn, true);

        return composite;
    }


    createTower() {

        var tower = Matter.Composites.stack(0, 0, 1, 3, 0, 0, function(x, y) {
            var box = this.createBox();
            console.dir(box);
            return this.getBounds(box);
            //     return Body.create({
            //          parts: [partA, partB]
            //      });
        });

        return tower;
    }


    createBox(width, height, girth) {

        // var test = Matter.Bodies.rectangle(0, 0, 80, 10);
        // console.dir(typeof(test));

        let xoffset = ((width - girth) / 2);
        let yoffset = ((height - girth) / 2);

        var grid = Matter.Composites.stack(0, 0, 3, 3, 0, 0, function(x, y) {
            var partA = Matter.Bodies.rectangle(x, y, width, girth);
            var part1 = Matter.Bodies.rectangle(x - xoffset, y + yoffset, girth, (height - 2 * girth));
            var partB = Matter.Bodies.rectangle(x, y + yoffset * 2, width, girth);
            var part2 = Matter.Bodies.rectangle(x + xoffset, y + yoffset, girth, (height - 2 * girth));
            // var partA = Matter.Bodies.rectangle(x, y, 80, 10);
            // var part1 = Matter.Bodies.rectangle(x - 35, y + 35, 10, 60);
            // var partB = Matter.Bodies.rectangle(x, y + 70, 80, 10);
            // var part2 = Matter.Bodies.rectangle(x + 35, y + 35, 10, 60);

            return Matter.Body.create({
                // parts: [partA, part1, part2]
                parts: [partA, partB, part1, part2]
            });

        });


        // let col = this.createColumns();
        // Matter.Composite.add(box, col);

        console.dir(Matter.Composite.bounds(grid));

        // ()

        console.dir(grid);

        return grid;
    }

    createColumns() {

        var col = Matter.Composites.stack(0, 0, 2, 1, 60, 1, function(x, y) {
            console.log(`(${x},${y})`);
            return Matter.Bodies.rectangle(x, y, 10, 80);
        });
        return col;
    }

    getBounds(composite) {

        var body = Matter.Composite.bounds(composite);
        composite.bounds = body.bound;

        return composite;

    }

}






// var col = Matter.Composites.stack(0, 0, 2, 1, 60, 0, function(x, y) {
//                 console.log(`(${x},${y})`);
//                 return Matter.Bodies.rectangle(x, y, 10, 60);
//             });
//             var row = Matter.Composites.stack(0, 0, 1, 2, 0, 60, function(x, y) {
//                 console.log(`(${x},${y})`);
//                 return Matter.Bodies.rectangle(x, y, 80, 10);
//             });
//             var box = Matter.Composite.create();
//             Matter.Composite.add(box, [col, row]);
//             box.bounds = Matter.Composite.bounds(box);
//             box.position = { "x": 0, "y": 0 };
//             box.positionPrev = { "x": 0, "y": 0 };
//             console.dir(box);
//             return box;