class RemoveArchiveFromQuestions < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :archive, :boolean
  end
end
