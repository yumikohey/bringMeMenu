class Order < ApplicationRecord
	belongs_to :restaurant
	before_create :generate_order_number
	after_update_commit :broadcast_update_order
	after_create_commit :broadcast_orders

	def generate_order_number
		self.order_number = "DEV-" + rand(10 ** 5).to_s.rjust(5, '0')
	end

	def broadcast_update_order
		restaurant = Restaurant.find(self.restaurant_id)
		slug = restaurant.slug
		open_orders = restaurant.orders.where("created_at >= ? AND status = ?", Time.zone.now.beginning_of_day, "ordered")
		response = {
			"slug" => slug,
			"open_orders" => open_orders
 		}
 		OrderBroadcastJob.perform_later(response.to_json, slug)
	end

	def broadcast_orders
		restaurant = Restaurant.find(self.restaurant_id)
		slug = restaurant.slug
		# Update react's store for all incomplete orders
		# todo: pops up notification on right corner when new order comes in.
		open_orders = restaurant.orders.where("created_at >= ? AND status = ?", Time.zone.now.beginning_of_day, "ordered")
		response = {
			"new_order" => self,
			"slug" => slug,
			"open_orders" => open_orders
 		}
		OrderBroadcastJob.perform_later(response.to_json, slug)
	end
end
