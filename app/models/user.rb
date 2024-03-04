class User < ApplicationRecord
    has_secure_password
    validates_presence_of :email
    validates_uniqueness_of :email
    validates :password, length: { minimum: 6 }
    validates :username, presence: true, length: { maximum: 25 }, uniqueness: { case_sensitive: false }
    validates :points, numericality: { greater_than_or_equal_to: 0 }
  
    before_create :set_default_points
  
    private
  
    def set_default_points
      self.points ||= 0
    end
  end
  