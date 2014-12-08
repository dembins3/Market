var Market = (function (Market) {
    Market.Views = Market.Views || {};

    Market.Views.LibraryView = Backbone.View.extend({
	initialize: function () {
	    this.template = _.template($("#library-template").html());
	    this.render();
	    var self = this;
	    this.model.library.on("add", function (model) {
		self.$("#mediaList").append(getView(model).el);
	    });
	},
	render: function() {
	    this.$el.html(this.template());
	    console.log("Rendered library");
	    return this;
	}
    });

    return Market;
    
    function getView(model) {
	var view = new Market.Views.MediumCell({ model: model });
	view.$("a").first().attr("href", "/#/media/"+model.get("id"));
	return view;
    }
})(Market || {});
