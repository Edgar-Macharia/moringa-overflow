require 'jwt'

class ApplicationController < ActionController::API
  before_action :authorize_request
  MY_SECRET = Rails.application.secret_key_base

  def encode_token(user_id, remember: false)
    payload = { user_id: user_id }
    payload[:exp] = Time.now.to_i + 24.hours unless remember

    JWT.encode(payload, MY_SECRET, 'HS256')
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    return unless auth_header

    token = auth_header.split(' ').last
    # header: { 'Authorization': 'Bearer <token>' }
    begin
      JWT.decode(token, MY_SECRET, true, algorithm: 'HS256')
    rescue JWT::DecodeError, JWT::ExpiredSignature
      return nil
    end
  end

  def current_user
    return unless decoded_token

    user_id = decoded_token.first['user_id']
    @user ||= User.find_by(id: user_id)
  end

  def logged_in?
    !!current_user
  end

  def authorize_request
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end
