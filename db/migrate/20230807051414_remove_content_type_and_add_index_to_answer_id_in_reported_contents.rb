class RemoveContentTypeAndAddIndexToAnswerIdInReportedContents < ActiveRecord::Migration[6.0]
  def change
    remove_column :reported_contents, :content_type
    add_column :reported_contents, :answer_id, :integer
    add_index :reported_contents, :answer_id
    add_foreign_key :reported_contents, :answers, column: :answer_id, on_delete: :cascade
  end
end
