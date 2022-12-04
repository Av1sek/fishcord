class Api::ServerMembersController < ApplicationController
    wrap_parameters include: ServerMember.attribute_names + ['memberId'] + ['serverId']

    def create
        @servermember = ServerMember.new(servermember_params)
        if @servermember.save!
            @server = Server.find(@servermember.server_id)
            render '/api/servers/show'
        else 
            render json: {errors: @servermember.errors.full_messages}
        end
    end

    def show
        @servermember = ServerMember.find(params[:id])
        @server = Server.find(@servermember.server_id)
        render '/api/servers/show'
    end

    def index
        sub_ser = User.find_by(id: params[:user_id]).subscribed_servers
        @servers = Server.where.not(id: sub_ser)
        render '/api/servers/index'
    end

    private

    def servermember_params
        params.require(:server_member).permit(:member_id, :server_id)
    end

end
