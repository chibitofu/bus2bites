class AddLatColumnToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :lat, :string
  end
end
