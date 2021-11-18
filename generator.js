class Generator{
    constructor(){
        this.world = Matter.Composite.create();
        this.ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
        this.xref = 400;
        this.yref = 580;
    }

    getRandomWall(){
        let rand = Math.floor(Math.random() * 4);
        switch (rand) {
            case 0: 
                return new wall(rand);
        }
    }

    getWorld(){
        console.log(this.ground);
        Matter.Composite.add(this.world, this.ground);

        var box = this.createBox();

        this.translateGround(box);

        Matter.Composite.add(this.world, box);

        return this.world;
    }

    translateGround(composite){

        console.dir(Matter.Composite.bounds(composite));

    }



    createBox(){

        var box = Matter.Composites.stack(0, 0, 1, 1, 1, 1, function(x, y){
            return Matter.Bodies.rectangle(x, y, 80, 10);
        });
        let col = this.createColumns();
        Matter.Composite.add(box, col);

        return box;
    }

    createColumns() {

        var col = Matter.Composites.stack(0, 0, 2, 1, 1, 1, function(x, y) {
            console.log(`(${x},${y})`);
            return Matter.Bodies.rectangle(x * 6, y, 10, 60);
        });
        return col;
    }
}