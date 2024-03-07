class Event < ApplicationRecord
    validates :event_name, presence: true
    validates :event_date_start, presence: true
    validates :event_date_end, presence: true
    validates :location, presence: true
    has_many :event_placements
    has_many :players, through: :event_placements
    def formatted_name
        "#{event_name} - #{event_date_start.strftime('%b %d')}"
    end
end