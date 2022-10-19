class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.references :owner, null: false, foreign_key: {to_table: :users}
      t.timestamps 
    end
    create_table :server_members do |t|
      t.references :member, foreign_key: {to_table: :users}
      t.references :server, foreign_key: {to_table: :servers}
    end
  end
end
