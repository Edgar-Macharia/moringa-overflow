require 'jwt'
class SessionsController < ApplicationController
  skip_before_action :authorize_request, only: [:create]

  def create
    begin
      user = User.find_by!(email: params[:email])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        token = generate_token(user.id)
        render json: { message: "Login successfully", token: token, user_id: user.id }, status: :ok
      else
        render json: { error: 'Invalid password' }, status: :unauthorized
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def destroy
    if session[:user_id].present?
      session[:user_id] = nil
      render json: { message: 'Logged out successfully' }
    else
      render json: { error: 'Session not found' }, status: :not_found
    end
  end
  
  def is_logged_in?
    if session[:user_id].present?
      render json: { logged_in: true }
    else
      render json: { logged_in: false }
    end
  end

  private

  def generate_token(user_id)
    payload = { user_id: user_id, exp: Time.now.to_i + 24.hours }
    secret_key = Rails.application.secrets.secret_key_base
    JWT.encode(payload, secret_key)
  end
end
