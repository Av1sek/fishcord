json.message do 
    json.extract! @message, :id, :content, :author_id, :chatroom_id, :created_at, :updated_at
end