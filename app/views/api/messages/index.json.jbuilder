@messages.each do |message|
    json.set! message.id do 
        json.extract! message, :id, :content, :author_id, :chatroom_id, :author_name, :created_at, :updated_at
    end
end