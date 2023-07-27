class Answer < ApplicationRecord
    has_many :upvote
    has_many :downvote
    belongs_to :user
    belongs_to :question
end