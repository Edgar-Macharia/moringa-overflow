class UpvotesController < ApplicationController
  before_action :set_upvote, only: %i[ show edit update destroy ]

  # GET /upvotes or /upvotes.json
  def index
    @upvotes = Upvote.all
  end

  # GET /upvotes/1 or /upvotes/1.json
  def show
  end

  # GET /upvotes/new
  def new
    @upvote = Upvote.new
  end

  # GET /upvotes/1/edit
  def edit
  end

  # POST /upvotes or /upvotes.json
  def create
    @upvote = Upvote.new(upvote_params)

    respond_to do |format|
      if @upvote.save
        format.html { redirect_to upvote_url(@upvote), notice: "Upvote was successfully created." }
        format.json { render :show, status: :created, location: @upvote }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @upvote.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /upvotes/1 or /upvotes/1.json
  def update
    respond_to do |format|
      if @upvote.update(upvote_params)
        format.html { redirect_to upvote_url(@upvote), notice: "Upvote was successfully updated." }
        format.json { render :show, status: :ok, location: @upvote }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @upvote.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /upvotes/1 or /upvotes/1.json
  def destroy
    @upvote.destroy

    respond_to do |format|
      format.html { redirect_to upvotes_url, notice: "Upvote was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_upvote
      @upvote = Upvote.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def upvote_params
      params.require(:upvote).permit(:question_id, :users_id, :answer_id, :upvote_count)
    end
end
