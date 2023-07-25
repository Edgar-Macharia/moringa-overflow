json.extract! notification, :id, :user_id, :notification_type, :target_id, :is_read, :created_at, :updated_at
json.url notification_url(notification, format: :json)
