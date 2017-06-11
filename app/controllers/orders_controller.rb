class OrdersController < ApplicationController
	def index
		redux_store("restaurantStore")
	end
end
