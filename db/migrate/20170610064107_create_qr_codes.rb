class CreateQrCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :qr_codes do |t|
      t.boolean :expired, default: false
      t.string :qrcode, default: ""
      t.string :table_number
      t.string :description
      t.timestamps
    end

    add_reference :qr_codes, :restaurant, unique: true, index: true
  end
end
