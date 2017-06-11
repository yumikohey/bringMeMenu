class CreateMenus < ActiveRecord::Migration[5.0]
  def change
    create_table :menus do |t|
      t.string :name
      t.integer :available_time
      t.boolean :active

      t.timestamps
    end
  end
end
