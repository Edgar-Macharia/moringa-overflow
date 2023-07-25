class CreateVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :votes do |t|
      t.references :user,  null: false, foreign_key: true
      t.references :answer,  null: false, foreign_key: true
      t.references :question,  null: false, foreign_key: true
      t.boolean :vote_type

      t.timestamps
    end
  end
end
