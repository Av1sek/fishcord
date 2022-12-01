class Api::DchannelsController < ApplicationController
    wrap_parameters include: Dchannel.attribute_names + ['user1Id'] + ['user2Id'] + ['userId']

    def create
        @dchannel = Dchannel.new(dchannel_params)
        if @dchannel.save! 
            render '/api/dchannels/show'
        else 
            render json: {errors: @server.errors.full_messages}
        end
    end

    def index
        @dchannels = Dchannel.where(user_1_id: params[:user_id]) + Dchannel.where(user_2_id: params[:user_id])
        render '/api/dchannels/index'
    end

    def show
        @dchannel = Dchannel.find_by(id: params[:id])
        @dmessages = @dchannel.dmessages
        render '/api/dchannels/show'
    end

    private

    def dchannel_params
        params.require(:dchannel).permit(:user_1_id, :user_2_id)
    end

end