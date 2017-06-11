class QrsController < ApplicationController
	include ReactOnRails::Controller

	def index
		if current_restaurant_employee
			redux_store("restaurantStore")
			render 'index'
		else
			redirect_to root_url
		end
	end

	def add_qr_code
		if current_restaurant_employee
			params[:qr][:restaurant_id] = current_restaurant_employee.restaurant_id
			qr_code = QrCode.create(qr_code_params)
			render :json => {
				qr_code: qr_code
			}, status: :ok
		end
	end

	def get_active_qr_codes
		if current_restaurant_employee
			restaurant_id = current_restaurant_employee.restaurant_id
			qr_codes = Restaurant.find(restaurant_id).qr_codes
			render :json => {
				qr_codes: qr_codes
			}, status: :ok
		end
	end

	private
	  def qr_code_params
	    params.require(:qr).permit(:table_number, :description, :restaurant_id)
	  end
end
