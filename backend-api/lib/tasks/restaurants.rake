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
    lon = stop.lon
   
    # request based on location
    res = HTTParty.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lon}&radius=100&type=restaurant&key=#{google_key}")

    restaurants = res["results"]

    restaurants.each do |restaurant|
        puts restaurant["name"]
    end

    # #<Stop id: 531, name: "\"3rd Ave & James St\"", lat: "47.6026421", lon: "-122.331184", created_at: "2016-04-17 01:51:00", updated_at: "2016-04-17 01:51:00">

  end

end
