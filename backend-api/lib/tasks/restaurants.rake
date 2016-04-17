require 'httparty'
require 'dotenv'

Dotenv.load

namespace :restaurants do
  desc "Seed restaurants with google API data"
  task seed: :environment do

    google_key = ENV['GOOGLE_KEY']

    # Get a stop
    stop = Stop.first
    lat = stop.lat
    lng = stop.lng
   
    # request based on location
    restaurants_res = HTTParty.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lng}&radius=100&type=restaurant&key=#{google_key}")

    restaurants = restaurants_res["results"]

    restaurants.each do |restaurant|
        place_id = restaurant["place_id"]
        detail_res = HTTParty.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&key=#{google_key}
        ")

        details = detail_res["result"]

        unless details["opening_hours"] == nil || details["opening_hours"]["weekday_text"] == nil
            hours = details["opening_hours"]["weekday_text"].to_s
        else
            hours = "None"
        end

        Restaurant.create(name: details["name"], lat: details["geometry"]["location"]["lat"], lng: details["geometry"]["location"]["lng"], icon: restaurant["icon"], price_level: details["price_level"], rating: details["rating"], types: details["types"].to_s, hours: hours, address: details["formatted_address"], stop_id: stop.id)
    end

    # #<Stop id: 531, name: "\"3rd Ave & James St\"", lat: "47.6026421", lon: "-122.331184", created_at: "2016-04-17 01:51:00", updated_at: "2016-04-17 01:51:00">

  end

end
