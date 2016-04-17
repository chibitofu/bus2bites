class RestaurantsController < ApplicationController
require 'json'

  def index

    id = params[:id]
    route = Route.find_by(short_name:id.to_s)
    restaurants = route.restaurants
    collect = []

    restaurants.each do |restaurant| 
        bite_stop_pair = {}
        bite_stop_pair["restaurant"] = restaurant
        bite_stop_pair["stop"] = restaurant.stop

        collect << bite_stop_pair
    end
    
    resp = {data: collect}
    resp = resp.to_json
    
    render json: resp, status: :ok
  end
end
