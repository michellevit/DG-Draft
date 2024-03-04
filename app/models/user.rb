class User < ApplicationRecord
    has_secure_password
    validates_presence_of :email
    validates_uniqueness_of :email
    validates :password, length: { minimum: 6 }
    validates :username, presence: true, length: { maximum: 25 }, uniqueness: { case_sensitive: false }
  end
  