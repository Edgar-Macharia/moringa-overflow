class AddQuestionIdToNotifications < ActiveRecord::Migration[7.0]
  def change
    add_reference :notifications, :question, foreign_key: true
  end
end