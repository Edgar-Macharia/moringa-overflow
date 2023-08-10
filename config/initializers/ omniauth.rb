# config/initializers/omniauth.rb

Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', scope: 'email'
end
  