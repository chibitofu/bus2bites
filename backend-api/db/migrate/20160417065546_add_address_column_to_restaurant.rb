class AddAddressColumnToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :address, :string
  end
end
