class CreateUpvotes < ActiveRecord::Migration[7.0]
  def change
    create_table :upvotes do |t|
      t.references :question, null: true, foreign_key: true
      t.references :users, null: false, foreign_key: true
      t.references :answer, null: true, foreign_key: true
      t.integer :upvote_count

      t.timestamps
    end
  end
end
