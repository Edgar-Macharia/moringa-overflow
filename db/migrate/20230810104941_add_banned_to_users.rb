class AddBannedToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :banned, :boolean, default: false
  end
end
