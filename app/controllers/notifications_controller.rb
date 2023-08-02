class NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications.order(created_at: :desc)
    render json: @notifications
  end
   def mark_as_read
    notification = current_user.notifications.find(params[:id])
    notification.update(read_status: true)
    render json: { message: 'Notification marked as read successfully.' }
  end
end