class QuestionsController < ApplicationController
  before_action :set_question, only: %i[show edit update destroy]
  skip_before_action :authorize_request, only: [:index, :show]

  # GET /questions or /questions.json
  def index
    @questions = Question.includes(:tags, :answers)
    render json: @questions, each_serializer: QuestionSerializer, include: ['answers', 'tags']
  end  

  # GET /questions/1 or /questions/1.json
  def show
    question = Question.find(params[:id])
    render json: @question, include: 'answers'
  end

  # GET /questions/new
  def new
    @question = Question.new
    render json: @question
  end

  # GET /questions/1/edit
  def edit
    render json: @question
  end

  # POST /questions or /questions.json
  def create
    @question = Question.new(question_params)
  
    if @question.save
      # Handle tags association
      tag_ids = params[:question][:tag_ids]
      @question.tags << Tag.find(tag_ids) if tag_ids.present?
  
      render json: @question, status: :created, location: @question
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # PATCH/PUT /questions/1 or /questions/1.json
  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: { errors: @question.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1 or /questions/1.json
  def destroy
    @question.destroy
    render json: { message: "Question was successfully destroyed." }
  end

    # Archive question
  def archive
    question = Question.find_by(id: params[:id])

    if question
      question.update(archive: true) # Set the 'archived' attribute to true
      render json: { success: "Question saved successfully!" }, status: :ok
    else
      render json: { error: "Question not found" }, status: :not_found
    end
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
  
  private

  # Use callbacks to share common setup or constraints between actions.
  def set_question
    @question = Question.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Question not found." }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def question_params
    params.require(:question).permit(:title, :body, :user_id, :tag_ids)
  end  
end
