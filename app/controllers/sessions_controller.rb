require 'jwt'
class SessionsController < ApplicationController
  skip_before_action :authorize_request, only: [:is_logged_in?, :create]

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      token = generate_token(user.id)
      render json: { message:"Login successfully", token:}, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { message: 'Logged out successfully' }
  end

  def is_logged_in?
    if current_user || session[:user_id].present?
      render json: { logged_in: true, user: current_user }
    else
      render json: { logged_in: false }
    end
  end

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def generate_token(user_id)
    payload = { user_id: user_id, exp: Time.now.to_i + 24.hours }
    secret_key = Rails.application.secrets.secret_key_base
    JWT.encode(payload, secret_key)
  end
end