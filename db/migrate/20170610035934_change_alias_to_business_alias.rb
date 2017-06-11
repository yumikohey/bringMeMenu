class ChangeAliasToBusinessAlias < ActiveRecord::Migration[5.0]
  def change
  	rename_column :restaurants, :alias, :business_alias
  end
end
