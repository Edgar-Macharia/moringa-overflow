class AddModerationFieldsToReportedContents < ActiveRecord::Migration[6.0]
  def change
    add_column :reported_contents, :moderator_id, :integer
    add_column :reported_contents, :action_taken, :string
    add_column :reported_contents, :action_description, :text
    add_column :reported_contents, :handled_at, :datetime
    add_column :reported_contents, :resolved, :boolean, default: false

    add_foreign_key :reported_contents, :users, column: :moderator_id
  end
end
