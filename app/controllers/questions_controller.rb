class QuestionsController < ApplicationController
  before_action :set_question, only: %i[show edit update destroy]
  skip_before_action :authorize_request, only: [:index, :show]

  # GET /questions or /questions.json
  def index
    @questions = Question.all
    render json: @questions
  end

  # GET /questions/1 or /questions/1.json
  def show
    render json: @question
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

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_question
    @question = Question.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Question not found." }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def question_params
    params.require(:question).permit(:title, :body, :user_id, :tag_id)
  end
end
