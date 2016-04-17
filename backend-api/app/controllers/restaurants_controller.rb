class RestaurantsController < ApplicationController
  def index

    id = params[:id]
    route = Route.find_by(short_name:id.to_s)
    restaurants = route.restaurants
    collect = []

    restaurants.each do |restaurant| 
        rest_stop_pair = {}
        rest_stop_pair["restaurant"] = restaurant
        rest_stop_pair["stop"] = restaurant.stop

        collect << rest_stop_pair
    end

    
    render json: {data: collect}, status: :ok
  end
end
