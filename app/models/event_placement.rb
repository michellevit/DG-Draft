# app/models/event_placement.rb
class EventPlacement < ApplicationRecord
  belongs_to :event
  belongs_to :player
end
