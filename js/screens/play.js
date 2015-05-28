game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
                
		game.data.score = 0;
                me.levelDirector.loadLevel("subspace");
                this.resetPlayer(0, 450);
                me.input.bindKey(me.input.KEY.J, "attack");
                me.input.bindKey(me.input.KEY.D, "right");
                me.input.bindKey(me.input.KEY.A, "left");
                me.input.bindKey(me.input.KEY.W, "jump");
                

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        resetPlayer: function(x, y) {
            game.data.Player = me.pool.pull("player", x, y, {});
            me.game.world.addChild(game.data.Player, 100);
        }
});
