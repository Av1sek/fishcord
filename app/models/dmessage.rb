class Dmessage < ApplicationRecord

    validates :content, :author_id, :chatroom_id, :author_name, presence: true
    
    belongs_to :user,
        foreign_key: :author_id
    
    belongs_to :dchannel,
        foreign_key: :chatroom_id

end
