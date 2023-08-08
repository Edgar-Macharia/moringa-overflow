class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :social_media_id,
             :profile_picture, :social_media_provider, :is_admin, :is_moderator,
             :created_at, :updated_at, :password_reset_token, :password_reset_token_expiration

  has_many :questions
end