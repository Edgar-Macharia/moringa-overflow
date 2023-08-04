class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id, :tag_names

  has_many :answers
  has_many :tags
end