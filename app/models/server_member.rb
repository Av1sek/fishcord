# == Schema Information
#
# Table name: server_members
#
#  id        :bigint           not null, primary key
#  member_id :bigint           not null
#  server_id :bigint           not null
#
class ServerMember < ApplicationRecord

    belongs_to :server
    belongs_to :member,
        foreign_key: :member_id,
        class_name: :User

end

