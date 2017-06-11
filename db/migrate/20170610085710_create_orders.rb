class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
      t.string :order_number
      t.string :notes
      t.json :items
      t.string :table_number
      t.string :status, default: 'ordered'

      t.timestamps
    end

    add_reference :orders, :restaurant, unique: true, index: true
  end
end
