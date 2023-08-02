class TagsController < ApplicationController
  before_action :set_tag, only: %i[show edit update destroy]

  def index
    @tags = Tag.includes(:questions)
    render json: @tags
  end

  # GET /tags/1 or /tags/1.json
  def show
    render json: @tag
  end

  # POST /tags or /tags.json
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag, status: :created, location: @tag
    else
      render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tags/1 or /tags/1.json
  def update
    if @tag.update(tag_params)
      render json: @tag
    else
      render json: { errors: @tag.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /tags/1 or /tags/1.json
  def destroy
    @tag.destroy
    render json: { message: "Tag was successfully destroyed." }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tag
    @tag = Tag.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: "Tag not found." }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def tag_params
    params.require(:tag).permit(:name)
  end
end
