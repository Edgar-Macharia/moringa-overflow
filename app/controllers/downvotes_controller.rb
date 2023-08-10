class DownvotesController < ApplicationController
  before_action :set_downvote, only: %i[ show edit update destroy ]

  # GET /downvotes or /downvotes.json
  def index
    @downvotes = Downvote.all
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
