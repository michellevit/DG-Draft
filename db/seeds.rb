# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'json'

# Helper function to load JSON data
def load_json(filename)
  JSON.parse(File.read(File.join(Rails.root, 'lib', 'seeds', filename)))
end

# Seed events
events_data = load_json('events.json')
events_data.each do |event|
  Event.find_or_create_by(event_name: event['event_name'], event_date_start: event['event_date_start'], event_date_end: event['event_date_end']) do |e|
    e.location = event['location']
  end
end

# Seed MPO players
mpo_players_data = load_json('mpo_players.json')
mpo_players_data.each do |player|
  Player.find_or_create_by(pdga_number: player['pdga_number']) do |p|
    p.name = player['name']
    p.division = 'mpo'  
  end
end

# Seed FPO players
fpo_players_data = load_json('fpo_players.json')
fpo_players_data.each do |player|
  Player.find_or_create_by(pdga_number: player['pdga_number']) do |p|
    p.name = player['name']
    p.division = 'fpo'  
  end
end

puts "Database has been seeded."
