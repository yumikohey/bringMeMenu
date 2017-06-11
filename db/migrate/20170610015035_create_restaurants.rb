class CreateRestaurants < ActiveRecord::Migration[5.0]
  def change
    create_table :restaurants do |t|
      t.string :business_name
      t.string :alias
      t.string :owner_user_id
      t.string :business_phone_number
      t.string :contact_email
      t.string :registered_email
      t.string :tax_id
      t.string :street_name
      t.string :city
      t.string :state
      t.string :zip_code
      t.json   :cuisine_type
      t.timestamps
    end
  end
end
