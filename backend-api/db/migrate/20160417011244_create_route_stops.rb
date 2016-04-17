class CreateRouteStops < ActiveRecord::Migration
  def change
    create_table :route_stops do |t|
      t.integer :route_id
      t.integer :stop_id

      t.timestamps null: false
    end
  end
end
