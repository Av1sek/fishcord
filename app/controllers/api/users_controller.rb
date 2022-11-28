class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password'] + ['serverId']

  def index
    @server = Server.find(params[:server_id])
    @users = @server.members
    render 'api/users/index'
  end
  
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end

  end


  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end

