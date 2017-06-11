class Restaurant < ApplicationRecord
	has_many :restaurant_employees
	has_many :menus
	has_many :qr_codes
	has_many :orders

	before_create do
		self.business_name = "" if business_name.blank?
		self.business_alias = "" if business_alias.blank?
		self.business_phone_number = "" if business_phone_number.blank?
		self.contact_email = "" if contact_email.blank?
		self.registered_email = "" if registered_email.blank?
		self.tax_id = "" if tax_id.blank?
		self.street_name = "" if street_name.blank?
		self.city = "" if city.blank?
		self.state = "" if state.blank?
		self.zip_code = "" if zip_code.blank?
		self.cuisine_type = "" if cuisine_type.blank?
		self.slug = "" if slug.blank?
	end

	def get_slug
		slug = self.business_name.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '') + "-" + self.city + "-" + self.id.to_s
		self.update_attribute(:slug, slug)
	end
end
