var Market = (function (Market) {
    Market.Views = Market.Views || {};

    Market.Views.WishlistView = Backbone.View.extend({
        initialize: function () {
            this.template = _.template($("#wishlist-template").html());
            this.render();
            var self = this;
            this.model.wishlist.on("addWishlistItem", function (model) {
                self.$("#mediaList").append(getView(model).el);
            });
        },
        render: function() {
            this.$el.html(this.template());
            console.log("Rendered wishlist");
            return this;
        }
    });

    return Market;

    function getView(model) {
        var view = new Market.Views.MediumCell({ model: model });
        view.$("a").first().attr("href", "/#/wishlistItems/"+model.get("id"));
        return view;
    }
})(Market || {});
