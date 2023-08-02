class RenameUsersIdToUserId < ActiveRecord::Migration[7.0]
  def change
    rename_column :downvotes, :users_id, :user_id
  end
end
