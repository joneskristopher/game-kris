game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        this.type = "PlayerEntity";
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.addAnimation();
        this.setAttributes();
        this.setFlags();
        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
            image: "player",
            width: 64,
            height: 64,
            spritewidth: "64",
            spriteheight: "64",
            getShape: function() {
                return(new me.Rect(0, 0, 64, 64)).toPolygon();
                
            }
        }]);
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [249]);
        this.renderable.addAnimation("walk", [143, 144, 145, 146, 147, 148, 149, 150, 151]);
        this.renderable.addAnimation("attack", [195, 196, 197, 198, 199, 200]);
    },
    setAttributes: function() {
        this.body.setVelocity(game.data.playerMovement, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function() {
        this.facing = "right";
        this.attacking = false;
    },
    update: function(delta) {
        this.checkKeyPressesAndMove();
        this.setAnimation();
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkKeyPressesAndMove: function() {
        if(me.input.isKeyPressed("right")) {
            this.moveRight();
        }else if(me.input.isKeyPressed("left")) {
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
        if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            this.jump();
        }
        this.attacking = me.input.isKeyPressed("attack");
    },
    moveRight: function() {
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(false);
    },
    moveLeft: function() {
      this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.facing = "left";
        this.flipX(true);  
    },
    jump: function() {
      this.body.vel.y -= this.body.accel.y * me.timer.tick;  
    },
    setAnimation: function() {
        if(this.attacking) {
            if(!this.renderable.isCurrentAnimation("attack")) {
                this.renderable.setCurrentAnimation("attack", "idle");
                this.renderable.setAnimationFrame();
            }
        }else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if(!this.renderable.isCurrentAnimation("walk")){
            this.renderable.setCurrentAnimation("walk");
            }
        }else if(!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
});