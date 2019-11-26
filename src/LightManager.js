class LightManager{
    constructor(game, collidesWith){

        //needs param:
        //  game

        //needs to create/receive:
        //  group
        //  collisionGroup
        //  who it collides with and their callbacks - an array of arrays
        //formatted like [[collision group, callback]....]
        //normally the collides function can take more than one element with a callback, but this makes my life easier

        this.game = game;

        this.collisionGroup = game.physics.p2.createCollisionGroup();
        //this makes the groups collide with the world bounds
        game.physics.p2.updateBoundsCollisionGroup();

        this.group = game.add.group();
        this.group.enableBody = true;
        this.group.physicsBodyType = Phaser.Physics.P2JS;
        this.collidesWith = collidesWith;
    }

    setCollidesWith(collidesWith){
        this.collidesWith = collidesWith;
    }

    static hitLightbug(lightBody, bugBody){
        //for callback, first param is the one being collided with, second is the collider
        //pelletBody.sprite.eatenBy = bugBody.sprite;
        console.log(lightBody);
        //bugBody.sprite.kill();        
    }

    createLight(bug){
        let colour = 0xFFFFFF;
        let radius = 11;
        let seperation = 100 + (bug.height /2);
        // p'x = cos(theta) * (px-ox) - sin(theta) * (py-oy) + ox
        let lightX = Math.sin(bug.body.angle * (Math.PI / 180)) * seperation + bug.x;
        // p'y = sin(theta) * (px-ox) + cos(theta) * (py-oy) + oy
        let lightY = -1 * Math.cos(bug.body.angle * (Math.PI / 180)) * seperation + bug.y;


        let lightGraphic = this.game.add.graphics();
        lightGraphic.lineStyle(2, colour, 1);
        lightGraphic.beginFill(colour, 1);
        lightGraphic.drawCircle(lightX, lightY, radius*2);
        lightGraphic.endFill();
        let lightSprite = this.group.create(lightX, lightY, lightGraphic.generateTexture());

        lightGraphic.destroy();
        lightSprite.body.setCircle(radius);
        
        lightSprite.body.setCollisionGroup(this.collisionGroup);
        lightSprite.body.collides(this.collidesWith);
        lightSprite.attacker = bug;
    }

    drawLights(){
        this.group.forEachAlive(this.drawLight);
    }

    drawLight(light){
        shadowTexture.context.beginPath();
        shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
        shadowTexture.context.arc(light.x - game.camera.x, light.y - game.camera.y,
            LIGHT_RADIUS * light.scale.x, 0, Math.PI*2);
        shadowTexture.context.fill();
    }

}