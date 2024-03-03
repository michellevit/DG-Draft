class UsersController < ApplicationController
  include Tokenable
  before_action :authenticate_user, only: [:update_username]
  
  def update_username
    requested_username = params[:username]
    if @current_user.username == requested_username
      render json: { error: 'New username cannot be the same as the current one.' }, status: :unprocessable_entity
    elsif User.exists?(username: requested_username)
      render json: { error: 'Username already in use' }, status: :unprocessable_entity
    elsif @current_user.update(username: requested_username)
      render json: { user: @current_user }
    else
      render json: { error: 'Failed to update username' }, status: :unprocessable_entity
    end
  end

end
  