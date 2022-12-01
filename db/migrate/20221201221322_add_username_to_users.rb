class AddUsernameToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :dchannels do |t|
      t.string :user1_name
      t.string :user2_name
    end
  end
end
