class User < ApplicationRecord
    has_many :questions
    has_many :answers
    has_many :favorites
    has_many :favorited_questions, through: :favorites, source: :question
    has_many :reported_contents
    has_many :notifications
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
    attr_accessor :password_reset_token
    attr_accessor :password_reset_token_expiration
    def generate_password_reset_token
        self.password_reset_token = SecureRandom.urlsafe_base64
        self.password_reset_token_expiration = 1.hour.from_now
      end
end