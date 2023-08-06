class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :user_id, :tag_names, :created_at, :updated_at, :author_username, :upvotes_count, :downvotes_count

  has_many :answers
  has_many :tags
end