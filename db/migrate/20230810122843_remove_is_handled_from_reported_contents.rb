class RemoveIsHandledFromReportedContents < ActiveRecord::Migration[7.0]
  def change
    remove_column :reported_contents, :is_handled
  end
end
