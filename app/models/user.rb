# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  tag             :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :string
#  text_status     :string           not null
#  online_status   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :username, 
        presence: true, 
        length: { in: 3..32}, 
        format: {without: URI::MailTo::EMAIL_REGEXP, message: 'User'}

    validates :email, 
        uniqueness: true,
        presence: true, 
        length: { in: 3..255 }, 
        format: {with: URI::MailTo::EMAIL_REGEXP}
    
    validates :session_token,
        uniqueness: true,
        presence: true
    
    validates :password,
        length: { in: 6..255 },
        allow_nil: true

    validates :tag,
        presence: true,
        length: {maximum: 4}

    validates :text_status,
        presence: true
    
    validates :online_status,
        presence: true


    before_validation :ensure_session_token, :generate_default_values

    has_many :owned_servers, 
        foreign_key: :owner_id,
        class_name: :Server
    
    has_many :servers_joined,
        foreign_key: :member_id,
        class_name: :ServerMember

    has_many :subscribed_servers,
        through: :servers_joined,
        source: :server

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user&.authenticate(password)
    end

    def reset_session_token!
        self.update!(session_token: generate_unique_session_token)
        self.session_token
    end

    private 

    def generate_unique_session_token
        token = SecureRandom.urlsafe_base64
        while User.exists?(session_token: token) do
            token = SecureRandom.urlsafe_base64
        end
        return token
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def username_must_be_available 
        if !(User.where(username: self.username).count < 10000)
            errors.add('Too many users have this username, please try another')
        end
    end
    
    def generate_default_values
        self.text_status = "Hey, I'm new to Fishcord!"
        self.online_status = "Online"
        self.bio = "Empty"

        num_users = User.where(username: self.username).count
        new_tag = rand(10000)

        if (num_users < 10000)
            while (User.exists?(username: self.username, tag: new_tag)) do
                new_tag = rand(10000)
            end
        end

        if new_tag < 10
            self.tag = "000" + new_tag.to_s
        elsif new_tag < 100
            self.tag = "00" + new_tag.to_s
        elsif new_tag < 1000
            self.tag = "0" + new_tag.to_s
        else
            self.tag = new_tag.to_s
        end
    end
end
