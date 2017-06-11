class AddFieldsToMenu < ActiveRecord::Migration[5.0]
  def change
    add_reference :menus, :restaurant, foreign_key: true
  end
end
