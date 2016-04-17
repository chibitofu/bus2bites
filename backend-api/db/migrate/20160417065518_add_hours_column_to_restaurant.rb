class AddHoursColumnToRestaurant < ActiveRecord::Migration
  def change
    add_column :restaurants, :hours, :string
  end
end
