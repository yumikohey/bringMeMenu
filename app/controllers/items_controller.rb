class ItemsController < ApplicationController
	include ReactOnRails::Controller

	def add_item_to_menu
		if current_restaurant_employee
			restaurant = Restaurant.find(current_restaurant_employee.restaurant_id)
			if(restaurant.menus.length == 0)
				restaurant.menus.create(name: "Default", active: true)
			end
			current_menu = restaurant.menus.where(active:true).first()
			full_name = request.params["item"]["full_name"]
			new_item = Item.new(menu_id: current_menu.id, full_name: full_name)
			new_item.save!
			render :json => new_item.to_json
		end
	end

	def update_item
		if current_restaurant_employee
			restaurant = Restaurant.find(current_restaurant_employee.restaurant_id)
			item_id = request.params["id"]
			item_params = request.params["item"]
			item = Item.find(item_id)
			item.update!(item_params)
			render :json => item.to_json
		end
	end

	private
	  def item_params
	    params.require(:item).permit(:full_name, :alias_name, :ingredients, :regular_price, :active, :on_sale, :featured, :sales_price, :historial_pricing, :inactive_reason, :tags, :prep_time)
	  end
end
