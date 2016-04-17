class AddLngColumnToRouteStop < ActiveRecord::Migration
  def change
    add_column :route_stops, :lng, :string
  end
end
