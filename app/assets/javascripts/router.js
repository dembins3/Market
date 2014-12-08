var Market = (function (Market) {
    
    Market.Router = Backbone.Router.extend({
	currentView: null,
	routes: {
	    "" : "home",
	    "add" : "addMedium",
	    "media/:id": "showMedium",
	    "library" : "showLibrary",
        "wishlist": "showWishlist",
        "addwishlistitem" : "addWishlistItem",
        "wishlistItems/:id" :"showWishlistItem"
	},

	addMedium: function() {
	    console.log("Loading add Medium");
	    
	    if ( this.currentView ) 
		this.currentView.remove();
	    this.currentView = new Market.Views.AddMediumView();
	    $("#content").html(this.currentView.el);
	},

	showMedium: function(id) {
	    var medium = new Market.Model.Medium({id: id});
	    medium.fetch({
		success:function(medium){
		    if ( this.currentView )
			this.currentView.remove();
		    this.currentView = new Market.Views.MediumDetailView({model: medium});
		    $("#content").html(this.currentView.el);
		},
		error:function() {
		    console.log("Error");
		    $("#content").empty();
		    if ( this.currentView ) 
			this.currentView.remove();
		    this.currentView = new Market.Views.MediumDetailView({model: null});
		}
	    });
	},

    addWishlistItem: function() {
        console.log("loading add Wishlist Item");

        if (this.currentView)
        this.currentView.remove();
        this.currentView = new Market.Views.AddWishlistItemView();
        $("#content").html(this.currentView.el);
    },

    showWishlistItem: function(id) {
        var wishlistItem = new Market.Model.WishlistItem({id: id});
        wishlistItem.fetch({
            success:function(wishlistItem){
                if (this.currentView)
                this.currentView.remove();
                this.currentView = new Market.Views.WishlistItemDetailView({model: wishlistItem});
                $("#content").html(this.currentView.el);
            },
            error:function() {
                console.log("Error");
                $("#content").empty();
                if (this.currentView)
                this.currentView.remove();
                this.currentView = new Market.Views.WishlistItemDetailView({model: null});
            }
        });
    },

	home: function() {
	    var medium = new Market.Model.Medium({id: window.mediumId});
	    medium.fetch({
		success:function(medium){
		    $("#content").empty();
		    new Market.Views.MediumDetailView({model: medium});
		},
		error: function() {
		    console.log("failed to fetch model");
		}
	    });
	},

	showLibrary: function() {
	    var user = Market.Model.User.getCurrentUser();
	    user.fetch({
		success: function(user) {
		    var library = user.library();
		    
		    if ( this.currentView )
			this.currentView.remove();
		    this.currentView = new Market.Views.LibraryView({
			model: {
			    user: user,
			    library: library
			}
		    });
		    
		    $("#content").html(this.currentView.el);
		},
		error: loadError
	    });

	    function loadError(entity) {
		console.log("Load error");
	    }
	},

        showWishlist: function() {
            var user = Market.Model.User.getCurrentUser();
            user.fetch({
                success: function(user) {
                    var wishlist = user.wishlist();

                    if ( this.currentView )
                        this.currentView.remove();
                    this.currentView = new Market.Views.WishlistView({
                        model: {
                            user: user,
                            wishlist: wishlist
                        }
                    });

                    $("#content").html(this.currentView.el);
                }
            });

            function loadError(entity) {
                console.log("Load error");
            }
        }
});

    Backbone.history.start();
    Market.router = new Market.Router();

    templateLoader.on("load:templates", function() {
	Market.router.navigate("library", { trigger: true });
    });

    return Market;
})(Market || {});
