define(function (require) {
  var AppRouter = Marionette.AppRouter.extend({
  	appRoutes: {
  		'Dashboard': 'dashboard',
  		'Dashboard/': 'dashboard'
  	}
  })

  var App = Backbone.SubRoute.extend({
    routes: {
      '': 'dashboard'
    },
  	initialize: function (opt) {
      this.layout = opt.layout
  	},
  	dashboard () {
  	  this.layout.showChildView('main', 'dashboard')
  	}
  })

  return App
})