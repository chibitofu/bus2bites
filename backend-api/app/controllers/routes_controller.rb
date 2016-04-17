class RoutesController < ApplicationController
  def index
    routes = Route.all
    render json: routes, status: :ok
  end
end
