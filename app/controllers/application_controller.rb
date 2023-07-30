require 'jwt'
class ApplicationController < ActionController::API
  before_action :authorize_request
  MY_SECRET  = Rails.application.secrets.secret_key_base
  def encode_token(user_id, remember: false)
    if remember
      payload = { user_id: user_id }
    else
      payload = { user_id: user_id, exp: Time.now.to_i + 24.hours }
    end
  
    JWT.encode(payload, MY_SECRET)
  end
  

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        JWT.decode(token, MY_SECRET, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :unauthorized
      end
    else
      render json: { error: 'Missing token' }, status: :unauthorized
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!current_user
  end

  def authorize_request
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end
