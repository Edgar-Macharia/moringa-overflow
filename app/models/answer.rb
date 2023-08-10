class Answer < ApplicationRecord
    has_many :upvotes, dependent: :destroy
    has_many :downvotes, dependent: :destroy
    belongs_to :user
    belongs_to :question
end