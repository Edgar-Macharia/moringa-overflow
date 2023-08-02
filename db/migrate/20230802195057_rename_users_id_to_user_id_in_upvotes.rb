class RenameUsersIdToUserIdInUpvotes < ActiveRecord::Migration[7.0]
  def change
    rename_column :upvotes, :users_id, :user_id
  end
end
