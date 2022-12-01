class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names + ['authorId'] + ['chatroomId'] + ['authorName']

    def create
        @message = Message.new(message_params)
        if @message.save!
            @conversation = Channel.find(@message[:chatroom_id])
            ConversationChannel.broadcast_to(@conversation, @message)
            render '/api/messages/show'
        else
            render json: {errors: @message.errors.full_messages}
        end            
    end

    def show
        @message = Message.find(params[:id])
        render '/api/messages/show'
    end

    def index
        @messages = Message.where(chatroom_id: params[:chatroom_id])
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @message.destroy
    end

    def update
        @message = Message.find(params[:id])
        @message.update(message_params)
        render '/api/messages/show'
    end

    private

    def message_params 
        params.require(:message).permit(:content, :author_id, :chatroom_id, :author_name)
    end
    
end
