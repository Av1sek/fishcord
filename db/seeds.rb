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

    puts 'Done seeding db'
    
end