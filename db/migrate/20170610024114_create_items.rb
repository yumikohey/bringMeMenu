class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :alias_name
      t.string :full_name
      t.json :ingredients
      t.decimal :regular_price, :precision => 10, :scale => 2
      t.boolean :on_sale
      t.boolean :featured
      t.boolean :recommended
      t.integer :restaurant_ratings
      t.json :historial_pricing
      t.boolean :active
      t.decimal :sales_price, :precision => 10, :scale => 2

      t.timestamps
    end
  end
end
