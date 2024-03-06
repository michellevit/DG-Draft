class Event < ApplicationRecord
    validates :event_name, presence: true
    validates :event_date_start, presence: true
    validates :event_date_end, presence: true
    validates :location, presence: true
    has_many :event_outcomes
  has_many :players, through: :event_outcomes
end