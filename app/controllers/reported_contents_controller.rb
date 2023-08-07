class ReportedContentsController < ApplicationController
  before_action :set_reported_content, only: %i[ show edit update destroy ]

  def create
    reported_content = ReportedContent.new(reported_content_params)
    reported_content.user = current_user
    reported_content.is_handled = false

    if reported_content.save
      render json: { message: 'Content reported successfully.' }, status: :created
    else
      render json: { errors: reported_content.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    reported_content = ReportedContent.find(params[:id])

    # Ensure the current user is authorized to handle reported content (e.g., moderator/admin)
    if current_user_can_handle_reported_content?
      if reported_content.update(report_handling_params)
        render json: { message: 'Reported content updated successfully.' }, status: :ok
      else
        render json: { errors: reported_content.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Unauthorized to handle reported content.' }, status: :unauthorized
    end
  end

  private

  def reported_content_params
    params.require(:reported_content).permit(:question_id, :reason)
  end

  def report_handling_params
    params.require(:reported_content).permit(:is_handled)
  end

  def current_user_can_handle_reported_content?
    # Implement your logic to check if the current user is authorized to handle reported content

  end
end
