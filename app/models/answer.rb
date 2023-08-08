class Answer < ApplicationRecord
    has_many :upvotes
    has_many :downvotes
    belongs_to :user
    belongs_to :question
end