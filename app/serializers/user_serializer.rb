class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :social_media_id,
             :profile_picture, :social_media_provider, :is_admin, :is_moderator,
             :created_at, :updated_at

  has_many :questions
end