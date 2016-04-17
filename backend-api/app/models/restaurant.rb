class Restaurant < ActiveRecord::Base
    has_many :stops
    has_many :routes, :through => :stops
    belongs_to :stop, foreign_key: "stop_id"
end
