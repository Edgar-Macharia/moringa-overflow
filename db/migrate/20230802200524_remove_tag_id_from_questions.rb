class RemoveTagIdFromQuestions < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :tag_id
  end
end
