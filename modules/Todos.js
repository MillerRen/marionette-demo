define(function (require) {
	var data = [{title: 'item1', id: 1}, {title: 'item2', id: 2}]
	var todos = new Backbone.Collection()

	var TodoItemView = Marionette.View.extend({
		tagName: 'li',
		template: _.template('<a href="#/Todos/<%= id %>"><%= title %></a>')
	})

	var TodoDetailView = Marionette.View.extend({
		template: _.template('<h3><%= title %></h3>')
	})

	var EmptyView = Marionette.View.extend({
		template: _.template('啥也没有')
	})

	var TodoListView = Marionette.CompositeView.extend({
		emptyView: EmptyView,
		childView: TodoItemView,
		collection: todos,
		template: _.template('<h3>todos <button class="load">加载</button><button class="clear">清空</button></h3><ul id="todo-list"></ul>'),
		container: '#todo-list',
		events: {
			'click .load': 'fetchData',
			'click .clear': 'clearData'
		},
		fetchData: function () {
			this.collection.reset(data)
		},
		clearData: function () {
			this.collection.reset([])
		}
	})

	var Router = Marionette.AppRouter.extend({
		appRoutes: {
			'Todos': 'index',
			'Todos/': 'index',
			'Todos/:id': 'detail'
		}
	})

	var App = Marionette.Application.extend({
		initialize: function (opt) {
			this.router = new Router({
				controller: this
			})
		},
		index: function () {
			this.showView(new TodoListView())
		},
		detail: function (id) {
			todos.reset(data)
			var todo = todos.findWhere({id: parseInt(id)})
			this.showView(new TodoDetailView({model: todo}))
		}
	})

	return App
})
