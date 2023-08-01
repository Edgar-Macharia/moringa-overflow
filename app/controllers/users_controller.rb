class UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create]

  def create
    begin
      if params[:password] == params[:password_confirmation]
        user = User.create!(user_params.slice(:username, :email, :password))
        render json: { message: "Account created successfully" }, status: :created
      else
        render json: { errors: ["Password and password confirmation do not match"] }, status: :unprocessable_entity
      end
    rescue ActiveRecord::RecordInvalid => e
      render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])

    # Check if the current user is the same as the one being updated
    if user.id != current_user.id
      render json: { errors: ["Unauthorized to perform this action"] }, status: :unauthorized
      return
    end

    # Update the user's profile attributes except for the password
    if user.update(user_params.except(:password, :password_confirmation))
      render json: { message: "Profile updated successfully" }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def reset_password
    user = User.find(params[:id])

    # Check if the current user is the same as the one resetting the password
    if user.id != current_user.id
      render json: { errors: ["Unauthorized to perform this action"] }, status: :unauthorized
      return
    end

    # Check if the new password and password confirmation match
    if user_params[:password].blank? || user_params[:password_confirmation].blank?
      render json: { errors: ["New password and password confirmation cannot be blank"] }, status: :unprocessable_entity
      return
    elsif user_params[:password] != user_params[:password_confirmation]
      render json: { errors: ["New password and password confirmation do not match"] }, status: :unprocessable_entity
      return
    end

    # Check if the current password is correct
    if !user.authenticate(user_params[:current_password])
      render json: { errors: ["Current password is incorrect"] }, status: :unprocessable_entity
      return
    end

    # Update the user's password
    if user.update(user_params.slice(:password))
      render json: { message: "Password reset successful" }, status: :ok
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(params[:id])
    render json: user, include: ['questions']
  end
  
  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end


# app/controllers/users_controller.rb

class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:create]

  def show
    render json: current_user, status: :ok
  end

  def update
    if current_user.update(user_params)
      render json: { message: "Profile updated successfully." }, status: :ok
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :email) # Add other attributes that can be updated here
  end
end
