class AddFieldsToItems < ActiveRecord::Migration[5.0]
  def change
    add_column :items, :tags, :text, array: true, default:[]
    add_column :items, :prep_time, :integer
    add_column :items, :inactive_reason, :string
    add_reference :items, :category, foreign_key: true
    add_reference :items, :menu, foreign_key: true
  end
end
