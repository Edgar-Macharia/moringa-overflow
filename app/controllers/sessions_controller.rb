require 'jwt'
class SessionsController < ApplicationController
  skip_before_action :authorize_request, only: [:create]
   
  def create  
    begin
      # Check if the user is logging in with Google.
      if request.env['omniauth.auth']
        email = request.env['omniauth.auth']['info']['email']
        user = User.find_by(email: email)
        
        if user
          # Log the user in.
          token = encode_token(user.id, remember: remember_me)
          render json: { success: "Login successfully", token: token, user_id: user.id, username: user.username }       
         else
          # The user authentication failed.
          render json: { error: 'Authentication failed.' }, status: :unauthorized
        end
      else
        # Check if the user is logging in with password and email.
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
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def omniauth_authorize
    # Redirect the user to the Google login page.
    redirect_to OmniAuth::Strategies::Google.new(Rails.application.config.omniauth.providers[:google]).authorize_url
  end
end
