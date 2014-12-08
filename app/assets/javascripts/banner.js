var BannerView = Backbone.View.extend({
    el: "#banner",
    initialize: function() {
	this.template = _.template($("#banner-template").html());
	this.render();
	this.nameField = this.$(".username");
	
	const self = this;
	Market.Model.User.getCurrentUser().fetch({
	    success:function(user) {
		self.nameField.html(user.get("name"));
	    }
	});
    },
    render: function() {
	this.$el.html(this.template());
	return this;
    }
});


$(function() {
    templateLoader.on("load:templates", function () {
        window.bannerView = new BannerView();
    });
});

