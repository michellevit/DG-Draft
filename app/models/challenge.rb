class Challenge < ApplicationRecord
  
  belongs_to :event, inverse_of: :challenges
  belongs_to :challenger, class_name: 'User', foreign_key: 'challenger_id', inverse_of: :challenges_as_challenger
  belongs_to :challengee, class_name: 'User', foreign_key: 'challengee_id', inverse_of: :challenges_as_challengee
  validates :start_condition, inclusion: { in: %w[challenger challengee random] }
  validates :status, inclusion: { in: %w[Pending Accepted] }
  validate :unique_challenge_per_event

  private

  def unique_challenge_per_event
    existing_challenge = Challenge.find_by(event_id: event_id, challenger_id: challenger_id, challengee_id: challengee_id, division: division)
    errors.add(:base, 'A similar challenge already exists for this event and division') if existing_challenge.present? && existing_challenge.id != id
  end 
  
end