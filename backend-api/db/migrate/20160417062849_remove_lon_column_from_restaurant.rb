class RemoveLonColumnFromRestaurant < ActiveRecord::Migration
  def change
    remove_column :restaurants, :lon, :string
  end
end
