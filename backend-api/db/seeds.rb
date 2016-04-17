# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# ROUTES
# route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,route_text_color
# 100001,KCM,"1","","Kinnear - Downtown Seattle",3,http://metro.kingcounty.gov/schedules/001/n0.html,,
  # route_id
  # route_short_name
    # route_long_name?, "route_desc", route_url

# TRIPS
# route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,block_id,shape_id,peak_flag,fare_id
# 100272,62763,12437968,"SEACREST MARINA ","LOCAL",1,4194723,10773038,0,10
  # route_id, trip_id
  # direction_id
    # trip_headsign?

# STOP_TIMES
# trip_id,arrival_time,departure_time,stop_id,stop_sequence,stop_headsign,pickup_type,drop_off_type,shape_dist_traveled,fare_period_id
# 12437968,15:19:01,15:19:01,31811,2,"",0,0,0.0,1
  # trip_id, stop_id

# STOPS
# stop_id,stop_code,stop_name,stop_desc,stop_lat,stop_lon,zone_id,stop_url,location_type,parent_station,stop_timezone
# 10000,,"NE 55th St & 43rd Ave NE",,47.6685753,-122.283653,21,,0,,America/Los_Angeles
  # stop_id
  # stop_name, stop_at, stop_lon
require 'set'

file = "../../king_county_bus/"

route_nums = ["37", "40"]
direction = "1"

route_nums.each do |route_num|
  routes     = File.open("#{file}routes.txt", "r")
  trips      = File.open("#{file}trips.txt", "r")
  stop_times = File.open("#{file}stop_times.txt", "r")
  stops      = File.open("#{file}stops.txt", "r")
  route = nil
  trip_ids = Set.new
  stop_times_stop_ids = Set.new

  routes.each_line do |route_line|
    route_info = route_line.split(',')

    route_id         = route_info[0]
    route_short_name = route_info[2][1..-2] # because the short name is formatted ex. "\"40\""
    route_desc       = route_info[4]

    if route_short_name == route_num
      route = Route.create(
         id: route_id.to_i,
         short_name: route_short_name,
         desc: route_desc
      )
    end
  end

  trips.each_line do |trip_line|
    trip_info = trip_line.split(',')
    trip_route_id     = trip_info[0]
    trip_direction_id = trip_info[5]

    if route.id.to_s == trip_route_id && trip_direction_id == direction
      trip_id = trip_info[2]
      trip_ids.add(trip_id)
    end
  end

  stop_times.each_line do |stop_times_line|
    stop_times_trip_id = stop_times_line[0..7]

    trip_ids.each do |trip|
      if trip == stop_times_trip_id
        stop_times_info = stop_times_line.split(',')
        stop_times_stop_id = stop_times_info[3]
        stop_times_stop_ids.add(stop_times_stop_id)
      end
    end
  end

  stops.each_line do |stops_line|
    stop_line_info = stops_line.split(',')
    stop_id = stop_line_info[0]
    stop_times_stop_ids.each do |stop_time|
      if stop_time == stop_id
        stop_name = stop_line_info[2]
        stop_lat  = stop_line_info[4]
        stop_lng  = stop_line_info[5]

        if Stop.find_by(id: stop_id.to_i, route_id: route.id) == nil
            Stop.create(id: stop_id.to_i, name: stop_name, lat: stop_lat, lng: stop_lng, route_id: route.id)
        end
      end
    end
  end

  routes.close
  trips.close
  stop_times.close
  stops.close
end
