class RemoveQuestionIdsFromTags < ActiveRecord::Migration[7.0]
  def change
    remove_column :tags, :question_ids
  end
end
