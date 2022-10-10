class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false, uniqueness: true
      t.string :tag, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false, uniqueness: true
      t.string :bio
      t.string :text_status, null: false
      t.string :online_status, null: false
      t.timestamps
    end
  end
end
