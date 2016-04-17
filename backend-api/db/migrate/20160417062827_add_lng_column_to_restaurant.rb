class AddLngColumnToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :lng, :string
  end
end
