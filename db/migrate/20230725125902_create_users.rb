class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.integer :social_media_id
      t.string :profile_picture
      t.string :social_media_provider
      t.boolean :is_admin
      t.boolean :is_moderator

      t.timestamps
    end
  end
end



