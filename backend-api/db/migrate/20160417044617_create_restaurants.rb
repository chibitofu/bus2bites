class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name
      t.integer :lat
      t.integer :lon
      t.string :icon
      t.integer :price_level
      t.string :rating
      t.string :types
      t.integer :stop_id

      t.timestamps null: false
    end
  end
end
