class User < ApplicationRecord
    has_many :questions
    has_many :answers
    has_many :votes
    has_many :comments
    has_many :reported_contents
    has_many :notifications
    has_secure_password
    validates :username, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
end