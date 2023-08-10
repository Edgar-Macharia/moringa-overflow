require 'jwt'
class SessionsController < ApplicationController
  skip_before_action :authorize_request, only: [:create]

  def create
    begin
      user = User.find_by!(email: params[:email])
      if user&.authenticate(params[:password])
        if user.banned?
          render json: { error: 'This account has been banned. Please Email support.' }, status: :forbidden
        else
          remember_me = params[:rememberMe]
          token = encode_token(user.id, remember: remember_me)
          render json: { success: "Login successfully", token: token, user_id: user.id, remember_me: remember_me, username: user.username }, status: :ok
        end
      else
        render json: { error: 'Invalid password' }, status: :unauthorized
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
end
