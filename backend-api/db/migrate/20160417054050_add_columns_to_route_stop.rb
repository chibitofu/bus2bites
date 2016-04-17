class AddColumnsToRouteStop < ActiveRecord::Migration
  def change
    add_column :route_stops, :name, :string
    add_column :route_stops, :lat, :string
    add_column :route_stops, :lon, :string
  end
end
