class UpvotesController < ApplicationController
  before_action :set_upvote, only: %i[ show edit update destroy ]

  # GET /upvotes or /upvotes.json
  def index
    @upvotes = Upvote.all
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
