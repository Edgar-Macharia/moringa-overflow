class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]
  # skip_before_action :authorize_request, only: [:create, :show]

  def create
    if params[:password_digest] == params[:password_confirmation]
      user = User.create!(user_params.slice(:username, :email, :password_digest ))
      render json: user, status: :created
    else
      render json: { errors: ["Password and password confirmation do not match"] }, status: :unprocessable_entity
    end
  end
  

  # GET /users/1 or /users/1.json
  def show
  end


  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :email, :password_digest, :password_confirmation)
    end
end


  # # POST /users or /users.json
  # def create
  #   @user = User.new(user_params)

  #   respond_to do |format|
  #     if @user.save
  #       format.html { redirect_to user_url(@user), notice: "User was successfully created." }
  #       format.json { render :show, status: :created, location: @user }
  #     else
  #       format.html { render :new, status: :unprocessable_entity }
  #       format.json { render json: @user.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

    # # GET /users/new
    # def new
    #   @user = User.new
    # end
  
    # # GET /users/1/edit
    # def edit
    # end
  
  