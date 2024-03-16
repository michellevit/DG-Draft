class Challenge < ApplicationRecord
  
  belongs_to :event
  belongs_to :challenger, class_name: 'User', foreign_key: 'challenger_id'
  belongs_to :challengee, class_name: 'User', foreign_key: 'challengee_id'
  validates :start_condition, inclusion: { in: %w[challenger challengee random] }
  validates :status, inclusion: { in: %w[pending accepted] }
  validate :unique_challenge_per_event

  private

  def unique_challenge_per_event
    existing_challenge = Challenge.find_by(event_id: event_id, challenger_id: challenger_id, challengee_id: challengee_id)
    errors.add(:base, 'Challenge already exists against this user for this event') if existing_challenge.present?
  end  
  
end