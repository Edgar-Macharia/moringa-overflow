json.extract! reported_content, :id, :user_id, :content_type, :content_id, :reason, :is_handled, :created_at, :updated_at
json.url reported_content_url(reported_content, format: :json)
