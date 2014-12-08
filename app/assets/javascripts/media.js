var Market = (function (Market) {
    //Bind the model

    Market.Model = Market.Model || {};
    
    Market.Model.Medium = Backbone.Model.extend({
	defaults: {
	    title: "",
	    author: "",
	    kind: "",
	    aux: "",
	    created: "",
	    owner: -1
	},
	
	initialize: function() {
	    if ( this.get("id") ) 
		this.url = "/media/" + this.get("id");
	},

	parse: function (res) {
	    return _.chain(res)
		.extend({
		    created: res.year_created,
		    aux: res.secondary_info,
		    owner: res.user_id
		})
		.pick("title","author", "created_at", "created", "aux", "kind", "owner", "id", "tags")
		.value();
	},

	toJSON: function() {
	    var cached, ret;
	    ret =  _.chain(this.attributes)
		.clone()
		.tap(function(tmp){ cached = tmp; })
		.extend({
		    year_created: cached.created,
		    secondary_info: cached.aux,
		    user_id: cached.owner
		})
		.pick("title", "author", "year_created", "secondary_info", "kind", "user_id", "id", "tags")
		.value();
	    return ret;
	}
    });
    
    Market.Model.Media = Backbone.Collection.extend({
	model: Market.Model.Medium,
	url: "/media"
    });


    //Bind the Media Views
    Market.Views.MediumDetailView = Backbone.View.extend({
	events: {
	    "click #close" : "deleteMedium"
	},
	initialize: function() {
	    this.template = _.template($("#media-template").html());
	    this.missingTemplate = _.template($("#missing-media-template").html());
	    this.render();
	},
	
	render : function () {
	    var template = this.model ? 
		this.template : 
		this.missingTemplate;
	    this.$el.html(template(this.bindVar()));
	    return this;
	},
	
	deleteMedium: function () {
	    this.model.destroy({
		success:function() {
		    Market.router.navigate("library", { trigger: true });
		}
	    });
	},

	bindVar: function () {
	    const kind = this.model ? this.model.get("kind") : "";
	    const authorLabel = this.model && this.model.get("kind");
	    var tags = _.map(this.model.get("tags"), function(tag) {
		return tag.name;
	    });
	    
	    return _.chain(this.model ? this.model.attributes : {})
		.clone()
		.extend({
		    authorLabel: getAuthorLabel(kind),
		    createdLabel:'Year created',
		    glyphicon: getGlyph(kind),
		    tags: tags.join(", ")
		    
		})
		.value();
	}
	
    });

    Market.Views.AddMediumView = Backbone.View.extend({
	events: {
	    "change select": "updateLabels",
	    "click #create-button": "addMedia"
	},
	initialize: function() {
	    this.template = _.template($("#add-media-template").html());
	    this.render();

	    this.authorLabel = this.$("#author-label");
	    this.auxLabel = this.$("#aux-label");

	    this.title = this.$("#title");
	    this.kind = this.$("#kind");
	    this.aux = this.$("#aux");
	    this.author = this.$("#author");
	    this.tags = this.$("#tags");
	},
	
	render : function () {
	    this.$el.html(this.template());
	    return this;
	},

	updateLabels: function() {
	    var val = this.$('select').val()
	    var kind = this.$('select option[value="'+val+'"]').html();
	    kind = kind.toLowerCase();
	    this.authorLabel.html(capitalize(getAuthorLabel(kind)));
	    this.auxLabel.html(capitalize(getAuxLabel(kind)));
	},

	addMedia: function() {
	    var library = Market.Model.User.getCurrentUser().library();
	    console.log(library);
	    library.create(this.attr(), {
		success: function() {
		    Market.router.navigate("library", { trigger: true });
		}
	    });
	    
	    console.log("adding media");
	},

	attr: function() {

	    var tag_input = this.tags.val().trim().split(/[^A-Za-z0-9]/);
	    var tags_obj = _.map(tag_input, nestName);
	    return {
		title: this.title.val(),
		aux: this.aux.val(),
		kind: this.getKind(),
		author: this.author.val(),
		owner: window.uid,
		tags: tags_obj
	    };

	    function nestName(tag) {
		return { 
		    name: tag
		};
	    }
	},

	getKind: function() {
	    return this.$("#kind option:selected").text().toLowerCase();
	}
    });

    var addPanel = new Market.Views.AddMediumView();
    Market.singleton = Market.singleton || {};
    Market.singleton.AddPanel = addPanel;

    var cell = Backbone.View.extend({
	initialize: function() {
	    this.template = _.template($("#medium-cell-template").html());
	    this.render();
	},
	render: function () {
	    this.$el.html(this.template(getVariables(this.model)));
	}
    });

    Market.Views.MediumCell = cell;

    return Market;

    function getAuthorLabel(kind) {
	return {
	    music: 'Artist',
	    movie: 'Director',
	    game:  'Studio'
	}[kind] || 'Author';
    }

    function getAuxLabel(kind) {
	return {
	    game: "platform"
	}[kind] || "genre";
    }

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
		authorLabel: getAuthorLabel(kind),
		createdLabel:'Year created',
		glyphicon: getGlyph(kind)
	    })
	    .value();
    }
})(Market || {});



