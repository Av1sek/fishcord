class Channel < ApplicationRecord

    validates :name, presence: true

    belongs_to :server,
        foreign_key: :server_id

    

end
