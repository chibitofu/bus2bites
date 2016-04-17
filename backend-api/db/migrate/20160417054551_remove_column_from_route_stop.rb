class RemoveColumnFromRouteStop < ActiveRecord::Migration
  def change
    remove_column :route_stops, :stop_id, :integer
  end
end
