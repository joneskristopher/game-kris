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
        this.renderable.addAnimation("walk", [195, 196, 197, 198, 199, 200]);
        this.renderable.addAnimation("attack", []);
    },
    setAttributes: function() {
        this.body.setVelocity(game.data.playerMovement, 20);
    },
    setFlags: function() {
        this.facing = "right";
        this.attacking = false;
    },
    update: function(delta) {
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    }
});