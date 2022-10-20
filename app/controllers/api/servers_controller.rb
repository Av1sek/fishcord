class Api::ServersController < ApplicationController
    wrap_parameters include: Server.attribute_names + ['ownerId'] 

    def create
        @server = Server.new(server_params)
        if @server.save! 
            ServerMember.create!(member_id: @server.owner_id, server_id: @server.id)
            Channel.create!(server_id: @server.id, name: "general")
            @user = User.find_by(id: @server.owner_id)
            @servers = @user.subscribed_servers
            render '/api/servers/index'
        else 
            render json: {errors: @server.errors.full_messages}
        end
    end

    def show
        @server = Server.find(params[:id])
        render '/api/servers/show'
    end

    def index
        @user = User.find_by(id: params[:user_id])
        @servers = @user.subscribed_servers
        render '/api/servers/index'
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        @server.destroy
    end

    def update
        @server = Server.find(params[:id])
        @server.update(server_params)
    end
    
    private

    def server_params
        params.require(:server).permit(:owner_id, :name)
    end

end

