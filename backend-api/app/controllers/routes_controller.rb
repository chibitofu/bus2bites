class RoutesController < ApplicationController
  def index
    routes = Route.all
    routes.sort
    render json: routes, status: :ok
  end
end
