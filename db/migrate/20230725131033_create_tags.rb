class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.boolean :vote_type
      t.integer :frequency

      t.timestamps
    end
  end
end
