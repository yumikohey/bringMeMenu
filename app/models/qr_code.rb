class QrCode < ApplicationRecord
	belongs_to :restaurant

	after_create :create_qr_code

	private
		def create_qr_code
			domain = "http://rm-restaurant.herokuapp.com/menu/"
			restaurant = Restaurant.find(restaurant_id)
			if restaurant.slug == "" || restaurant.slug.nil?
				restaurant.get_slug
			end
			restaurant_name = restaurant.slug
			url = domain + restaurant_name + "/?table=" + self.table_number.to_s
			qrcode = RQRCode::QRCode.new(url)
			# With default options specified explicitly
			png = qrcode.as_png(
			          resize_gte_to: false,
			          resize_exactly_to: false,
			          fill: 'white',
			          color: 'black',
			          size: 120,
			          border_modules: 4,
			          module_px_size: 6,
			          file: nil # path to write
			          )
			self.update_attribute(:qrcode, png.to_data_url)
		end
end
