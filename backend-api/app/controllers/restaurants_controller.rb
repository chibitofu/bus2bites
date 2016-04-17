class RestaurantsController < ApplicationController
  def index

    id = params[:id]
    route = Route.find_by(short_name:id.to_s)
    restaurants = route.restaurants
    collect = []
    counter = 0

    restaurants.each do |restaurant| 
        rest_key = "restaurant" + counter.to_s
        stop_key = "stop" + counter.to_s
        rest_info = {"#{rest_key}": restaurant}
        stop_info = {"#{stop_key}": restaurant.stop}

        collect << rest_info
        collect << stop_info
        
        counter += 1
    end

    
    render json: {data: collect}, status: :ok
  end
end
