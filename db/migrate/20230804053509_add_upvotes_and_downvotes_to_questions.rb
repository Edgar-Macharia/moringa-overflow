class AddUpvotesAndDownvotesToQuestions < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :upvotes_count, :integer, default: 0
    add_column :questions, :downvotes_count, :integer, default: 0

    add_index :questions, :upvotes_count
    add_index :questions, :downvotes_count
  end
end
