# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 

    puts 'Destroying User Table'
    User.destroy_all
    #first user will have an id of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    puts 'Creating new users'

    User.create!(
        username: 'DemoUser',
        email: 'demo@user.io',
        password: 'password'
    )

    User.create!(
        username: 'DemoFriend',
        email: 'demofriend@user.io',
        password: 'password'
    )

    User.create!(
        username: 'FriendlyDemo',
        email: 'friendlydemo@user.io',
        password: 'password'
    )

    Server.create!(
        name: "TestServer",
        owner_id: 1
    )

    Channel.create!(
        server_id: 1,
        name: "general"
    )

    Channel.create!(
        server_id: 1,
        name: "memes"
    )

    Server.create!(
        name: "TestServer2",
        owner_id: 2
    )

    Channel.create!(
        server_id: 2,
        name: "general"
    )

    ServerMember.create!(
        member_id: 1,
        server_id: 1
    )

    ServerMember.create!(
        member_id: 2,
        server_id: 1
    )

    ServerMember.create!(
        member_id: 3,
        server_id: 1
    )

    ServerMember.create!(
        member_id: 1,
        server_id: 2
    )

    ServerMember.create!(
        member_id: 2,
        server_id: 2
    )

    Dchannel.create!(
        user_1_id: 1,
        user_2_id: 2,
        user1_name: "DemoUser",
        user2_name: "DemoFriend"
    )

    Dchannel.create(
        user_1_id: 3,
        user_2_id: 1,
        user1_name: "FriendlyDemo",
        user2_name: "DemoUser"
    )
    
    puts 'Done seeding db'
    
end