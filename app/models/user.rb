class User < ApplicationRecord
    has_many :questions
    has_many :answers
    has_many :votes
    has_many :comments
    has_many :reported_contents
    has_many :notifications
end