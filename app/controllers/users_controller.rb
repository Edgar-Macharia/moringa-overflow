class UsersController < ApplicationController
skip_before_action :authorize_request, only: [:create]
rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid
rescue_from ActiveRecord::RecordNotFound, with: :user_not_found

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

    # Check if the username already exists
    if params[:username] && User.exists?(username: params[:username]) && user.username != params[:username]
      render json: { errors: ["Username already exists"] }, status: :unprocessable_entity
      return
    end

    # Check if the email already exists
    if params[:email] && User.exists?(email: params[:email]) && user.email != params[:email]
      render json: { errors: ["Email already exists"] }, status: :unprocessable_entity
      return
    end

    # Update the user's profile attributes
    updated_params = params.require(:user).permit(:username, :email, :password)
    
    if user.update(updated_params)
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

  def favorite_questions
    user = User.find(params[:id])
    favorite_questions = user.favorited_questions

    render json: favorite_questions, status: :ok
  end

  def update_profile_picture
    user = User.find(params[:id])
    uploaded_image = params[:image]
    
    begin
      puts "Uploading profile picture"
      cloudinary_response = Cloudinary::Uploader.upload(uploaded_image, with_secure_url: true)
      
      user.update_columns(profile_picture: cloudinary_response['secure_url'])
      puts cloudinary_response

      if cloudinary_response['error']
        render json: { error: "Error uploading profile picture: #{cloudinary_response['error']}" }, status: :unprocessable_entity
      else
        render json: { profile_picture_url: user.profile_picture }
      end
    rescue => e
      render json: { error: "Error updating profile picture: #{e.message}" }, status: :unprocessable_entity
    end
  end
  
  def ban
    question = Question.find(params[:id])
    user = User.find(question.user_id)

    user.update_columns(banned: true)

    Question.find(params[:id]).destroy

    render json: { message: 'User has been banned and question has been deleted.' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Question not found.' }, status: :not_found
  end

  
  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation, :current_password)
  end
  
  def update_params
    params.require(:user).permit(:username, :email)
  end

  def handle_record_invalid(exception)
    render json: { error: exception.message }, status: :unprocessable_entity
  end
  
  def user_not_found
    render json: { error: 'User not found' }, status: :not_found
  end
end
