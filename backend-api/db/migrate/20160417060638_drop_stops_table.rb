class DropStopsTable < ActiveRecord::Migration
  def change
    drop_table :stops
  end
end
