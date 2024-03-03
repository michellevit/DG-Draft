class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]
  
  
    def update_username
      @user = User.find(params[:id])
      requested_username = params[:username]
      
      if User.exists?(username: requested_username)
        render json: { error: 'Username already in use' }, status: :unprocessable_entity
      else
        if @user.update(username: requested_username)
          render json: { user: @user }
        else
          render json: { error: 'Failed to update username' }, status: :unprocessable_entity
        end
      end
    end
    
end
  