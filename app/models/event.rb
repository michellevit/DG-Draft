class Event < ApplicationRecord
    validates :event_name, presence: true
    validates :event_date_start, presence: true
    validates :event_date_end, presence: true
    validates :location, presence: true
end