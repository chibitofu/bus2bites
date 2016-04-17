class Stop < ActiveRecord::Base
    belongs_to :route
    belongs_to :restaurant
    has_many :restaurants
end
