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

  var Layout = Marionette.View.extend({
    regions: {
      'header': '#header',
      'main': '#main',
      'footer': '#footer'
    },
    template: _.template('<header id="header"></header><main id="main"></main><footer id="footer"></footer>')
  })

  var App = Marionette.Application.extend({
    initialize: function () {
      this.modules = {}
      this.router = new AppRouter({
        controller: this
      })
      this.showView(new Layout())
    },
    // 加载并初始化应用
    loadModule: function (module, subroute) {
      var that = this
      if (that.modules[module]) return
      seajs.use(module, function (Sub) {
        that.modules[module] = new Sub(module, {createTrailingSlashRoutes: true, layout: that.getView()})
      })
    },
    defaultRoute: function (path) {
      this.getView().showChildView('main', new NotFoundView({path: path}))
    },
    onStart: function () {
      Backbone.history.start()
    }
  })

  return App

});
