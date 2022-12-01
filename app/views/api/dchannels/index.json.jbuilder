@dchannels.each do |dchannel|
    json.set! dchannel.id do 
        json.extract! dchannel, :id, :user_1_id, :user_2_id, :user1_name, :user2_name
    end
end