class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names + ['authorId'] + ['chatroomId'] 

    def create
        @message = Message.new(message_params)
        if @message.save!
            render '/api/messages/index'
        else
            render json: {errors: @message.errors.full_messages}
        end            
    end

    def show
        @message = Message.find(params[:id])
        render '/api/messages/show'
    end

    def index
        @messages = Message.where(chatroom_id: params[:id])
    end

    private

    def message_params 
        params.require(:message).premit(:content, :author_id, :chatroom_id)
    end
    
end
