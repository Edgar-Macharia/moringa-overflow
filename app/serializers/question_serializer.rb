class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id, :archive

  has_many :answers
  has_many :tags
end