class Dchannel < ApplicationRecord

    validates :user_1_id, :user_2_id, presence: true

    has_many :dmessages,
        foreign_key: :chatroom_id,
        class_name: :Dmessage,
        dependent: :destroy

end
