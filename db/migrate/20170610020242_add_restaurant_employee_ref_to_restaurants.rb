class AddRestaurantEmployeeRefToRestaurants < ActiveRecord::Migration[5.0]
  def change
    add_reference :restaurant_employees, :restaurant, foreign_key: true
  end
end
