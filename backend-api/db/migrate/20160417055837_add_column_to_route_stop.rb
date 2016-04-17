class AddColumnToRouteStop < ActiveRecord::Migration
  def change
    add_column :route_stops, :restaurant_id, :integer
  end
end
