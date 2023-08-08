class ResetController < ApplicationController
  require 'sendgrid_mailer'
  skip_before_action :authorize_request, only: [:request_reset, :reset_password]

  def request_reset
    user = User.find_by(email: params[:email])

    if user
      reset_token = generate_reset_token(user)

      SendgridMailer.send_password_reset(user.email, reset_token).deliver_now
      # user.update_columns(password_reset_token: reset_token)

      render json: { message: 'Password reset email sent successfully.' }, status: :ok
    else
      render json: { error: 'Email not found.' }, status: :not_found
    end
  end
  def reset_password
    user = User.find_by(id: params[:reset_token])
    # expiration = @user.password_reset_token_expiration
    # puts params[:reset_token]
    puts user.id
    puts user.email
    puts Time.now
    if user 
      # && user.password_reset_token_expiration && user.password_reset_token_expiration > Time.now)
      
      if user.update(password: params[:password])
        render json: { message: 'Password reset successful.' }, status: :ok
      else
        render json: { error: 'Failed to reset password. Please try again later.' }, status: :unprocessable_entity
      end
    else
      render json: { error: user }, status: :unprocessable_entity
      # render json: { error: 'Password reset link is invalid or has expired.' }, status: :unprocessable_entity
    end
  end
  private

  def generate_reset_token(user)
    token = SecureRandom.urlsafe_base64
    user.update_columns(password_reset_token: token, password_reset_token_expiration: 27.hour.from_now)
    user
  end
end
