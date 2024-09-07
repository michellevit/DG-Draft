class Challenge < ApplicationRecord
  
  belongs_to :event, inverse_of: :challenges
  after_create :cleanup_expired_challenges
  after_update :cleanup_expired_challenges, if: :status_changed_to_accepted?
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

  def status_changed_to_accepted?
    saved_change_to_status? && status == "Accepted"
  end

  def cleanup_expired_challenges
    Challenge.delete_expired_challenges
  end

  def self.delete_expired_challenges
    joins(:event).where(status: "Pending").where("events.event_date_end < ?", Date.today).destroy_all
  end
  
end