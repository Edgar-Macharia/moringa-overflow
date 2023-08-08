class AnswersController < ApplicationController
  before_action :set_answer, only: %i[ show edit update destroy ]

  # GET /answers or /answers.json
  def index
    @answers = Answer.all
  end

  # GET /answers/1 or /answers/1.json
  def show
  end

  # GET /answers/new
  def new
    @answer = Answer.new
  end

  # GET /answers/1/edit
  def edit
  end

  # POST /answers or /answers.json
  def create
    @answer = Answer.new(answer_params)
    @user = current_user
    if @answer.save
      begin
        @user.notifications.create!(message: 'Your answer was successfully posted.')
      render json: { message: 'Answer created successfully', answer: @answer }, status: :created
    rescue => e
      render json: { errors: ["Error creating notification: #{e.message}"] }, status: :unprocessable_entity
    end
    else
      render json: { errors: @answer.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # PATCH/PUT /answers/1 or /answers/1.json
  def update
    respond_to do |format|
      if @answer.update(answer_params)
        format.html { redirect_to answer_url(@answer), notice: "Answer was successfully updated." }
        format.json { render :show, status: :ok, location: @answer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /answers/1 or /answers/1.json
  def destroy
    @answer.destroy

    respond_to do |format|
      format.html { redirect_to answers_url, notice: "Answer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def upvote
    @answer = Answer.find(params[:id])
    @user = current_user
  
    if @answer.upvotes.exists?(user_id: @user.id)
      render json: { error: 'You have already upvoted this answer.' }, status: :unprocessable_entity
      return
    end
  
    @answer.upvotes.create!(user: @user)
    @answer.update(upvotes_count: @answer.upvotes.count)
  
    if @answer.downvotes.exists?(user_id: @user.id)
      downvote = @answer.downvotes.find_by(user_id: @user.id)
      downvote.destroy
      @answer.update(downvotes_count: @answer.downvotes.count)
    end
  
    render json: {
      message: 'Upvoted answer successfully.',
      upvotes_count: @answer.upvotes_count,
      downvotes_count: @answer.downvotes_count
    }
  end
  
  def downvote
    @answer = Answer.find(params[:id])
    @user = current_user
  
    if @answer.downvotes.exists?(user_id: @user.id)
      render json: { error: 'You have already downvoted this answer.' }, status: :unprocessable_entity
      return
    end
  
    @answer.downvotes.create!(user: @user)
    @answer.update(downvotes_count: @answer.downvotes.count)
  
    if @answer.upvotes.exists?(user_id: @user.id)
      upvote = @answer.upvotes.find_by(user_id: @user.id)
      upvote.destroy
      @answer.update(upvotes_count: @answer.upvotes.count)
    end
  
    render json: {
      message: 'Downvoted answer successfully.',
      upvotes_count: @answer.upvotes_count,
      downvotes_count: @answer.downvotes_count
    }
  end  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def answer_params
      params.require(:answer).permit(:body, :user_id, :question_id, :upvotes, :downvotes)
    end
end
