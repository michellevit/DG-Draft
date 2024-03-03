class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]
  
  
    def update_username
      @user = User.find(params[:id])
      new_username = generate_unique_username
      if @user.update(username: new_username)
        render json: { user: @user }
      else
        render json: { error: 'Failed to update username' }, status: :unprocessable_entity
      end
    end
end
  