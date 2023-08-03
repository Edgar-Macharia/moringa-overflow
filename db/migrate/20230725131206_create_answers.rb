class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.text :body
      t.references :user, null: false, foreign_key: true, on_delete: :cascade
      t.references :question, null: false, foreign_key: true, on_delete: :cascad
      t.integer :upvotes
      t.integer :downvotes

      t.timestamps
    end
  end
end
