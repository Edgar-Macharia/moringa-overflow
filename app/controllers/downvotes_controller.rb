class DownvotesController < ApplicationController
  before_action :set_downvote, only: %i[ show edit update destroy ]

  # GET /downvotes or /downvotes.json
  def index
    @downvotes = Downvote.all
  end

  # GET /downvotes/1 or /downvotes/1.json
  def show
  end

  # GET /downvotes/new
  def new
    @downvote = Downvote.new
  end

  # GET /downvotes/1/edit
  def edit
  end

  # POST /downvotes or /downvotes.json
  def create
    @downvote = Downvote.new(downvote_params)

    respond_to do |format|
      if @downvote.save
        format.html { redirect_to downvote_url(@downvote), notice: "Downvote was successfully created." }
        format.json { render :show, status: :created, location: @downvote }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @downvote.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /downvotes/1 or /downvotes/1.json
  def update
    respond_to do |format|
      if @downvote.update(downvote_params)
        format.html { redirect_to downvote_url(@downvote), notice: "Downvote was successfully updated." }
        format.json { render :show, status: :ok, location: @downvote }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @downvote.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /downvotes/1 or /downvotes/1.json
  def destroy
    @downvote.destroy

    respond_to do |format|
      format.html { redirect_to downvotes_url, notice: "Downvote was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_downvote
      @downvote = Downvote.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def downvote_params
      params.require(:downvote).permit(:question_id, :users_id, :answer_id, :downvote_count)
    end
end
