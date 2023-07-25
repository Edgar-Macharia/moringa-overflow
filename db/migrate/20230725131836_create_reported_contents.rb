class CreateReportedContents < ActiveRecord::Migration[7.0]
  def change
    create_table :reported_contents do |t|
      t.references :user,  null: false, foreign_key: true
      t.integer :content_type
      t.integer :question,  null: false, foreign_key: true
      t.string :reason
      t.boolean :is_handled

      t.timestamps
    end
  end
end
