class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :author, foreign_key: {to_table: :users}
      t.references :chatroom, foreign_key: {to_table: :channels}
      t.text :content, null: false
      t.timestamps
    end
  end
end