class RenameRouteStopsToStops < ActiveRecord::Migration
  def change
    rename_table :route_stops, :stops
  end
end
