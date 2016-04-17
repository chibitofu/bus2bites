class RemoveLonColumnFromRouteStop < ActiveRecord::Migration
  def change
    remove_column :route_stops, :lon, :string
  end
end
