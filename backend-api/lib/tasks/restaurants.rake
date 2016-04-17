require 'httparty'
require 'dotenv'

Dotenv.load

namespace :restaurants do
  desc "Seed restaurants with google API data"
  task seed: :environment do

    google_key = ENV['GOOGLE_KEY']

    routes = Route.all

    routes.each do |route|
      stops = route.stops
      stops.each do |stop|
        # Get a stop
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

          if details # in case there are no detail results
            unless details["opening_hours"] == nil || details["opening_hours"]["weekday_text"] == nil
              hours = details["opening_hours"]["weekday_text"].to_s
            else
              hours = "None"
            end

            new_rest = Restaurant.create(name: details["name"], lat: details["geometry"]["location"]["lat"], lng: details["geometry"]["location"]["lng"], icon: restaurant["icon"], price_level: details["price_level"], rating: details["rating"], types: details["types"].to_s, hours: hours, address: details["formatted_address"], stop_id: stop.id)
            route.restaurants << new_rest
          else
            puts "No results were returned for restaurant with place_id: #{place_id}."
          end
          # TODO: What to do if there aren't results from a detail search?
        end
      end
    end
  end
end
