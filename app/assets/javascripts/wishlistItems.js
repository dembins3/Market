var Market = (function (Market) {
    //Bind the model

    Market.Model = Market.Model || {};

    Market.Model.WishlistItem = Backbone.Model.extend({
        defaults: {
            title: "",
            kind: "",
            owner: -1
        },

        initialize: function() {
            if ( this.get("id") )
                this.url = "/wishlistitems/" + this.get("id");
        },

        parse: function (res) {
            return _.chain(res)
                .extend({
                    owner: res.user_id
                })
                .pick("title", "kind", "id", "owner")
                .value();
        },

        toJSON: function() {
            var cached, ret;
            ret = _.chain(this.attributes)
                .clone()
                .tap(function (tmp) {
                    cached = tmp;
                })
                .extend({
                    user_id: cached.owner
                })
                .pick("title", "user_id", "id", "kind")
                .value();
            return ret;
        }

    });

    Market.Model.WishlistItems = Backbone.Collection.extend({
        model: Market.Model.WishlistItem,
        url: "/wishlistitems"
    });

    Market.Views.WishlistItemDetailView = Backbone.View.extend({
        events: {
            "click #close" : "deleteWishlistItem"
        },

        initialize: function() {
            this.template = _.template($("#wishlistItems-template").html());
            this.missingTemplate = _.template($("#missing-media-template").html());
            this.render();
        },

        render : function() {
            var template = this.model ? this.template : this.missingTemplate;
                this.$el.html(template(this.bindVar()));
            return this;
        },

        deleteWishlistItem: function() {
            this.model.destroy({
                success:function() {
                    Market.router.navigate("wishlist", { trigger: true });
                }
            })
        },

        bindVar: function() {
            const kind = this.model ? this.model.get("kind") : "";

            return _.chain(this.model ? this.model.attributes : {})
                .clone()
                .extend({
                    glyphicon: getGlyph(kind)
                })
                .value();
        }


    });

    Market.Views.AddWishlistItemView = Backbone.View.extend({
    events: {
        "click #addwl-button": "addWishlistItem"
    },
        initialize: function() {
            this.template = _.template($("#addWishlistItems-template").html());
            this.render();

            this.title = this.$("#title");
            this.kind = this.$("#kind");
        },

        render: function() {
            this.$el.html(this.template());
            return this;
        },

        addWishlistItem: function() {
            var wishlist = Market.Model.User.getCurrentUser().wishlist();
            console.log(wishlist);
            wishlist.create(this.attr(), {
                success: function() {
                    Market.router.navigate("wishlist", { trigger: true });
                }
            });

            console.log("adding wishlist item");
        },

        attr: function() {
            return {
                title: this.title.val(),
                kind: this.getKind(),
                owner: window.uid
            };
        },

        getKind: function() {
            return this.$("#kind option:selected").text().toLowerCase();
        }

    });

    var addPanel = new Market.Views.AddWishlistItemView();
    Market.singleton = Market.singleton || {};
    Market.singleton.AddPanel = addPanel;

    var wlcell = Backbone.View.extend({
        initialize: function() {
            this.template = _.template($("#medium-cell-template").html());
            this.render();
        },
        render: function() {
            this.$el.html(this.template(getVariables(this.model)));
        }
    });

    Market.Views.WishlistItemCell = wlcell;

    function getGlyph(type) {
        var elem, glyphType;
        const defaultGlyphType = "glyphicon-ban-circle";

        glyphType = ({
            music: "glyphicon-music",
            movie: "glyphicon-film",
            book:  "glyphicon-book",
            game:  "glyphicon-tower"
        }[type]) || defaultGlyphType;

        return "<span class='glyphicon "+glyphType+"'></span>";
    }

    function capitalize(str) {
        return str[0].toUpperCase() +
            str.substring(1).toLowerCase();
    }

    function getVariables(model) {
        const kind = model ? model.get("kind") : "";
        return _.chain(model ? model.attributes : {})
            .clone()
            .extend({
                glyphicon: getGlyph(kind)
            })
            .value();
    }
})(Market || {});
