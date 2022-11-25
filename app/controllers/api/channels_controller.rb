class Api::ChannelsController < ApplicationController
    wrap_parameters include: Server.attribute_names + ['serverId'] 

    def create
        @channel = Channel.new(channel_params)
        if @channel.save! 
            render '/api/channels/create'
        else 
            render json: {errors: @server.errors.full_messages}
        end
    end

    def index
        @server = Server.find_by(id: params[:server_id])
        @channels = Channel.where(server_id: @server.id)
        render '/api/channels/index'
    end

    def show
        @channel = Channel.find_by(id: params[:id])
        @messages = @channel.messages
        render '/api/channels/show'
    end

    def destroy
        @channel = Channel.find_by(id: params[:id])
        @channel.destroy
    end

    def update
        @channel = Channel.find(params[:id])
        @channel.update(channel_params)
    end

    private

    def channel_params
        params.require(:channel).permit(:server_id, :name)
    end

end