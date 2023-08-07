class Notification < ApplicationRecord
    belongs_to :user
    belongs_to :question
    # Add associations based on the notification_type and target_id columns
    belongs_to :target, polymorphic: true
end
  