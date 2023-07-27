json.extract! downvote, :id, :question_id, :users_id, :answer_id, :downvote_count, :created_at, :updated_at
json.url downvote_url(downvote, format: :json)
