class Channel < ApplicationRecord

    validates :name, presence: true

    belongs_to :server,
        foreign_key: :server_id

    has_many :messages,
        foreign_key: :chatroom_id,
        class_name: :Message,
        dependent: :destroy

end
