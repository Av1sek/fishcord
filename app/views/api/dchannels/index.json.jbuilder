@dchannels.each do |dchannel|
    json.set! dchannel.id do 
        json.extract! dchannel, :id, :user_1_id, :user_2_id
    end
end