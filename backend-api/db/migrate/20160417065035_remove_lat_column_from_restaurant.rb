class RemoveLatColumnFromRestaurant < ActiveRecord::Migration
  def change
    remove_column :restaurants, :lat, :integer
  end
end
