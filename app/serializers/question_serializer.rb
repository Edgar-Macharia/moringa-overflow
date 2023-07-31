class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id, :tag_id

  has_many :answers
end