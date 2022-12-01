json.dmessage do 
    json.extract! @dmessage, :id, :content, :author_id, :chatroom_id, :author_name, :created_at, :updated_at
end