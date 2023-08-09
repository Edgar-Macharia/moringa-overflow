class QuestionsController < ApplicationController
  before_action :set_question, only: %i[show edit update destroy]
  skip_before_action :authorize_request, only: [:index, :show, :search]
  rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid

  # GET /questions or /questions.json
  def index
    @questions = Question.includes(:tags, :answers)
    render json: @questions, each_serializer: QuestionSerializer, include: ['answers', 'tags', 'author_username']
  end  

  # GET /questions/1 or /questions/1.json
  def show
    question = Question.find(params[:id])
    render json: @question, include: 'answers'
  end

    # POST /questions or /questions.json
  def create
    @question = Question.new(question_params)

    tag_names = params[:question][:tag_names]

    if tag_names.present?
      tag_names.each do |tag_name|
        tag = Tag.find_or_create_by(name: tag_name)
        @question.tags << tag
      end
    end
    @user = current_user
    if @question.save
      begin
        @user.notifications.create!(message: 'Your question was successfully created.')
        render json: @question, status: :created, location: @question
      rescue => e
        render json: { errors: ["Error creating notification: #{e.message}"] }, status: :unprocessable_entity
      end      
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /questions/1 or /questions/1.json
  def update
    if @question.update(question_params)
      begin
        @user.notifications.create!(message: 'Your question was successfully updated.')
      render json: @question
    rescue => e
      render json: { errors: ["Error creating notification: #{e.message}"] }, status: :unprocessable_entity
    end
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1 or /questions/1.json
  def destroy
    @question.destroy
    render json: { message: "Question was successfully destroyed." }
  end

  # POST /questions/1/favorite => Favorite a question
    
  def favorite
    @question = Question.find(params[:id])
    @user = current_user

    if @user.favorites.exists?(question_id: @question.id)
      @user.favorites.find_by(question_id: @question.id).destroy
    else
      @user.favorites.create(question: @question)
    end

    favorited_questions = @user.favorited_questions.includes(:tags, :answers)

    render json: favorited_questions, each_serializer: QuestionSerializer, include: ['answers', 'tags', 'author_username']
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Question not found.' }, status: :not_found
  end


  def search
    query = params[:q]
  
    # Check if the search query is empty
    if query.blank?
      render json: { error: "Search query cannot be empty." }, status: :unprocessable_entity
      return
    end
  
    @questions = Question.where("title LIKE :query OR body LIKE :query", query: "%#{query}%")
  
    # Check if no matching questions were found
    if @questions.empty?
      render json: { error: "No matching questions found." }, status: :not_found
      return
    end
  
    render json: { questions: @questions, success: "Successful search." }, each_serializer: QuestionSerializer, include: 'answers'
  end

  def answers
    question = Question.find(params[:id])
    answers = question.answers

    render json: answers
  end

  def upvote
    @question = Question.find(params[:id])
    @user = current_user
  
    if @question.upvotes.exists?(user_id: @user.id)
      render json: { error: 'You have already upvoted this question.' }, status: :unprocessable_entity
      return
    end
  
    @question.upvotes.create!(user: @user)
    @question.update(upvotes_count: @question.upvotes.count)
  
    if @question.downvotes.exists?(user_id: @user.id)
      downvote = @question.downvotes.find_by(user_id: @user.id)
      downvote.destroy
      @question.update(downvotes_count: @question.downvotes.count)
    end
  
    render json: {
      message: 'Upvoted successfully.',
      upvotes_count: @question.upvotes_count,
      downvotes_count: @question.downvotes_count
    }
  end
  
  def downvote
    @question = Question.find(params[:id])
    @user = current_user
  
    if @question.downvotes.exists?(user_id: @user.id)
      render json: { error: 'You have already downvoted this question.' }, status: :unprocessable_entity
      return
    end
  
    @question.downvotes.create!(user: @user)
    @question.update(downvotes_count: @question.downvotes.count)
  
    if @question.upvotes.exists?(user_id: @user.id)
      upvote = @question.upvotes.find_by(user_id: @user.id)
      upvote.destroy
      @question.update(upvotes_count: @question.upvotes.count)
    end
  
    render json: {
      message: 'Downvoted successfully.',
      upvotes_count: @question.upvotes_count,
      downvotes_count: @question.downvotes_count
    }
  end  
  
  private

  # Use callbacks to share common setup or constraints between actions.
  def set_question
    @question = Question.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Question not found." }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def question_params
    params.require(:question).permit(:title, :body, :user_id, tag_ids: [], tag_names: [])
  end  

  def handle_record_invalid(exception)
    render json: { error: exception.message }, status: :unprocessable_entity
  end
end
