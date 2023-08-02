class RenameQuestionToQuestionIdInReportedContents < ActiveRecord::Migration[7.0]
  def change
    rename_column :reported_contents, :question, :question_id
    add_foreign_key :reported_contents, :questions, column: :question_id
  end
end
