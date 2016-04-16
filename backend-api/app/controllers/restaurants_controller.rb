class RestaurantsController < ApplicationController
  def index
    render json: {restaurants:[{name: "restaurant one", image:"blah.jpg"}, {name: "restaurant two", image:"blah2.jpg"} ]}, status: :ok
  end
end
