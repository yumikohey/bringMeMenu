class Item < ApplicationRecord
	belongs_to :menu
	has_many :photos
	before_create do
		self.alias_name = "" if alias_name.blank?
		self.full_name = "" if full_name.blank?
		self.regular_price = 0.00 if regular_price.blank?
		self.on_sale = false if on_sale.blank?
		self.featured = false if featured.blank?
		self.recommended = false if recommended.blank?
		self.restaurant_ratings = 5 if restaurant_ratings.blank?
		self.active = true if active.blank?
		self.sales_price = 0.00 if sales_price.blank?
		self.ingredients = {}.to_json if ingredients.blank?
		self.historial_pricing = {}.to_json if historial_pricing.blank?
	end
end
