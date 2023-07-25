class Notification < ApplicationRecord
    belongs_to :user
    # Add associations based on the notification_type and target_id columns
    belongs_to :target, polymorphic: true
end
  