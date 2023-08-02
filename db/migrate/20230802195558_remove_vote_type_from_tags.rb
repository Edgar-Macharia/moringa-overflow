class RemoveVoteTypeFromTags < ActiveRecord::Migration[7.0]
  def change
    remove_column :tags, :vote_type
  end
end
