class ReportedContentsController < ApplicationController
  
  def index
    reported_contents = ReportedContent.where(resolved: false)
    render json: reported_contents
  end

  def create
    reported_content = ReportedContent.new(reported_content_params)
    reported_content.user = current_user
    reported_content.resolved = false

    if reported_content.save
      render json: { message: 'Content reported successfully.' }, status: :created
    else
      render json: { errors: reported_content.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    reported_content = ReportedContent.find(params[:id])
  
    if current_user_can_handle_reported_content?
      if reported_content.update(report_handling_params.merge(moderator_id: current_user.id, action_taken: 'Do Nothing', action_description: 'No action taken', handled_at: Time.now, resolved: true))
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
    current_user.is_moderator? || current_user.is_admin?
  end
end
