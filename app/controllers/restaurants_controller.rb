class RestaurantsController < ApplicationController
	include ReactOnRails::Controller
	def new
		new_restaurant = Restaurant.new()
		new_restaurant.save!
		redirect_to new_restaurant_employee_registration_path(id=new_restaurant.id)
	end

	def register
		redirect_to new_restaurant_employee_registration
	end

	def profile
		if current_restaurant_employee
			redux_store("restaurantStore")
			render 'show'
		else
			redirect_to root_url
		end
	end

	def get_profile
		if current_restaurant_employee
			restaurant_id = current_restaurant_employee.restaurant_id
			@restaurant = Restaurant.find(restaurant_id)
			render :json => @restaurant.to_json
		end
	end

	def update_restaurant_profile
		if current_restaurant_employee
			restaurant_id = current_restaurant_employee.restaurant_id
			@restaurant = Restaurant.find(restaurant_id)
			@restaurant.update!(restaurant_params)
			render :json => @restaurant.to_json
		end
	end

	def main
		if current_restaurant_employee
			redux_store("restaurantStore")
			render 'main'
		end
	end

	def daily
		if current_restaurant_employee
			redux_store("restaurantStore")
			render 'daily'
		end
	end

	def kitchen
		if current_restaurant_employee
			redux_store("restaurantStore")
			render 'kitchen'
		end
	end

	def get_slug
		if current_restaurant_employee
			restaurant_id = current_restaurant_employee.restaurant_id
			restaurant = Restaurant.find(restaurant_id)
			render :json => {
				slug: restaurant.slug
			}, status: :ok
		end
	end

	def get_orders
		if current_restaurant_employee
			restaurant_id = current_restaurant_employee.restaurant_id
			restaurant = Restaurant.find(restaurant_id)
			orders = restaurant.orders.where("created_at >= ? AND status = ?", Time.zone.now.beginning_of_day, "ordered")
			render :json => {
				orders: orders
			}, status: :ok
		end
	end

	def update_order
		if current_restaurant_employee
			update_item_id = request.params["itemId"]
			update_item_complete = !request.params["complete"]
			order_number = request.params['order_number']
			order = Order.where({order_number:order_number}).first()
			items = order["items"]
			items[update_item_id]["done"] = update_item_complete
			order.update!({items: items})
			render :json => {
				order: order
			}, status: :ok
		end
	end

	private
	  def restaurant_params
	    params.require(:restaurant).permit(:business_name, :business_alias, :business_phone_number, :city, :contact_email, :cuisine_type, :registered_email, :state, :street_name, :tax_id, :zip_code)
	  end
end
