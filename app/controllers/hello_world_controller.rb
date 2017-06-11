class HelloWorldController < ApplicationController
	include ReactOnRails::Controller
	def index
	  	@page_name = 'landing'
	    @hello_world_props = { 
	    	enterprise_register_url: new_restaurant_path
	    }
	    redux_store("restaurantStore")
	end
end
