class Upvote < ApplicationRecord
  belongs_to :question
  belongs_to :users
  belongs_to :answer
end
