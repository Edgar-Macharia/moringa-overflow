class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id, :tag_names,:archive, :created_at, :updated_at, :author_username

  has_many :answers
  has_many :tags
end