class AddIsEmployerToRestaurantEmployees < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurant_employees, :is_employer, :boolean, default: false
  end
end
