class Api::DmessagesController < ApplicationController
    wrap_parameters include: Dmessage.attribute_names + ['authorId'] + ['chatroomId'] + ['authorName']

    def create
        @dmessage = Dmessage.new(dmessage_params)
        if @dmessage.save!
            @conversation = Dchannel.find(@dmessage[:chatroom_id])
            DconversationChannel.broadcast_to(@conversation, @dmessage)
            render '/api/dmessages/show'
        else
            render json: {errors: @message.errors.full_messages}
        end            
    end

    def show
        @dmessage = Dmessage.find(params[:id])
        render '/api/dmessages/show'
    end

    def index
        @dmessages = Dmessage.where(chatroom_id: params[:chatroom_id])
    end

    def destroy
        @dmessage = Dmessage.find_by(id: params[:id])
        @dmessage.destroy
    end

    def update
        @dmessage = Dmessage.find(params[:id])
        @dmessage.update(dmessage_params)
        render '/api/dmessages/show'
    end

    private

    def dmessage_params 
        params.require(:dmessage).permit(:content, :author_id, :chatroom_id, :author_name)
    end
    
end
