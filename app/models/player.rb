class Player < ApplicationRecord
    validates :name, presence: true
    validates :pdga_number, presence: true, uniqueness: true
    has_many :event_placements
    has_many :events, through: :event_placements
  end