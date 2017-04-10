define(function(require) {

  var AppRouter = Marionette.AppRouter.extend({
		appRoutes: {
			':module(/*subroute)': 'loadModule',
			'*path': 'defaultRoute'
		}
	})

  var NotFoundView = Marionette.View.extend({
  	template: _.template('<%= path %> not found!'),
  	model: new Backbone.Model({path: ''}),
  	initialize: function (opt) {
  		this.model.set('path', opt.path)
  	}
  })

	var App = Marionette.Application.extend({
		initialize: function () {
			this.module = null
			this.router = new AppRouter({
				controller: this
			})
		},
		// load and start app
		loadModule: function (module, subroute) {
			var that = this
			that.module && that.module.destroy()
			seajs.use(module, function (App) {
				that.module = new App({region: that.region, module: module + '/'}).start()
				Backbone.history.loadUrl(Backbone.history.getHash())
			})
		},
		defaultRoute: function (path) {
			this.showView(new NotFoundView({path: path}))
		},
		onStart: function () {
			Backbone.history.start()
			Backbone.history.navigate('Todos/', {trigger: true})
		}
	})

  return App

});
