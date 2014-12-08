var MenuView = Backbone.View.extend({    
    el: "#menu",
    initialize: function() {
	this.template = _.template($("#menu-template").html());
	this.render();
    },
    render: function() {
	this.$el.html(this.template());
    }

});

templateLoader.on("load:templates", function() {
    window.menuView = new MenuView();
});
