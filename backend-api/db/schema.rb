# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160417065546) do

  create_table "restaurants", force: :cascade do |t|
    t.string   "name"
    t.string   "icon"
    t.integer  "price_level"
    t.string   "rating"
    t.string   "types"
    t.integer  "stop_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "lng"
    t.string   "lat"
    t.string   "hours"
    t.string   "address"
  end

  create_table "routes", force: :cascade do |t|
    t.string   "short_name"
    t.string   "desc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stops", force: :cascade do |t|
    t.integer  "route_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "name"
    t.string   "lat"
    t.integer  "restaurant_id"
    t.string   "lng"
  end

end
