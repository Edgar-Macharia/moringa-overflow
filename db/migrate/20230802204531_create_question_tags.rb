class CreateQuestionTags < ActiveRecord::Migration[7.0]
  def change
    create_table :question_tags do |t|
      t.references :question, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
    end

    add_column :tags, :question_ids, :integer, array: true, default: []
  end
end