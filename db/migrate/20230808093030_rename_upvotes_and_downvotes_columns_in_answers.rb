class RenameUpvotesAndDownvotesColumnsInAnswers < ActiveRecord::Migration[7.0]
  def change
        rename_column :answers, :upvotes, :upvotes_count
        rename_column :answers, :downvotes, :downvotes_count
  end
end