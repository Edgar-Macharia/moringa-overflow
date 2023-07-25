json.extract! user, :id, :username, :email, :password_digest, :social_media_id, :profile_picture, :social_media_provider, :is_admin, :is_moderator, :created_at, :updated_at
json.url user_url(user, format: :json)
