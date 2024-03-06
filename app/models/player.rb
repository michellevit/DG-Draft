class Player < ApplicationRecord
    validates :name, presence: true
    validates :pdga_number, presence: true, uniqueness: true
  end