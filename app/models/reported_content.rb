class ReportedContent < ApplicationRecord
    belongs_to :user
    # Add associations based on the content_type and content_id columns
    belongs_to :content, polymorphic: true
end
  