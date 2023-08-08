class AddTagsToQuestions < ActiveRecord::Migration[6.0]
  def change
    add_column :questions, :tag_names, :string, default: ""
  end
end