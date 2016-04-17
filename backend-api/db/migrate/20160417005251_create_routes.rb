class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.string :short_name
      t.string :desc

      t.timestamps null: false
    end
  end
end
