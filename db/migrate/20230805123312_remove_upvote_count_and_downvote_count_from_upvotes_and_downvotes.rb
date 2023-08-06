class RemoveUpvoteCountAndDownvoteCountFromUpvotesAndDownvotes < ActiveRecord::Migration[7.0]
  def change
    remove_column :upvotes, :upvote_count, :integer
    remove_column :downvotes, :downvote_count, :integer
  end
end
