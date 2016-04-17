class RestaurantsController < ApplicationController
  def index
    render json: {restaurants:[{name: "Ten Sushi", street_address:"123 mahalo ln", bite_lat:"47.6062", bite_lon: "122.3321", icon:"https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png", hours:"12:00:00 - 23:00:00", price_level:3, bus_lat:"46.6062", bus_lon:"122.3321", type:["food", "sushi"]}, {name: "Annapurna", street_address:"456 mahalo ln", bite_lat:"87.6062", bite_lon: "22.3321", icon:"https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png", hours:"12:00:00 - 13:00:00", price_level:2, bus_lat:"56.6062", bus_lon:"142.3321", type:["food", "indian"]} ]}, status: :ok
  end
end
