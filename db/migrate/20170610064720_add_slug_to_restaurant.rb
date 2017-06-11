class AddSlugToRestaurant < ActiveRecord::Migration[5.0]
  def change
    add_column :restaurants, :slug, :string
  end
end
