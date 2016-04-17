class Route < ActiveRecord::Base
    has_many :stops
    has_many :restaurants, :through => :stops
end
