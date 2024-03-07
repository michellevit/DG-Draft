class Challenge < ApplicationRecord
    belongs_to :event
    belongs_to :challenger, class_name: 'User'
    belongs_to :challengee, class_name: 'User'
    validates :start_condition, inclusion: { in: %w[challenger challengee random] }
    validates :status, inclusion: { in: %w[pending accepted] }
  end