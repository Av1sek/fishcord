json.server do 
    json.extract! @server, :id, :name, :owner_id
end