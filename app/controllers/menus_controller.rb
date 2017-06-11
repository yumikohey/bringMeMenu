class MenusController < ApplicationController
	include ReactOnRails::Controller

	def index
		if current_restaurant_employee
			redux_store("restaurantStore")
			render 'index'
		else
			redirect_to root_url
		end
	end

	def order
		redux_store("restaurantStore")
		render 'order'
	end

	def get_items_from_menu
		if current_restaurant_employee
			restaurant = Restaurant.find(current_restaurant_employee.restaurant_id)
			if(restaurant.menus.length == 0)
				restaurant.menus.create(name: "Default", active: true)
			end
			@items = restaurant.menus.where(active:true).first().items
			render :json => @items.to_json
		else
			slug = params[:restaurant_slug]
			restaurant = Restaurant.where(slug: slug).first()
			@items = restaurant.menus.where(active:true).first().items
			render :json => {
				items: @items,
				restaurant_name: restaurant.business_alias
				}.to_json, status: :ok
		end
	end

end
