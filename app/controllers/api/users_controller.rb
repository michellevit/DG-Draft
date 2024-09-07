# users_controller.rb

module Api
  class UsersController < ApplicationController
    include TokenableConcern
    
    def update_password
      token = request.headers['Authorization']&.split(' ')&.last
      user, error = authenticate_token(token) if token

      if user
        @current_user = user
      else
        render json: { error: error || 'Invalid token' }, status: :unauthorized
        return
      end

      @user = @current_user

      if @user.authenticate(params[:current_password])
        if @user.update(password: params[:new_password])
          render json: { message: 'Password successfully updated' }, status: :ok
        else
          render json: { error: 'Unable to update password' }, status: :unprocessable_entity
        end
      else
        render json: { error: 'Current password is incorrect' }, status: :unauthorized
      end
    end

    def update_username
      token = request.headers['Authorization']&.split(' ')&.last
      user, error = authenticate_token(token) if token

      if user
        @current_user = user
      else
        render json: { error: error || 'Invalid token' }, status: :unauthorized
        return
      end

      new_username = params[:username]

      if new_username.present?
        if User.where('LOWER(username) = ?', new_username.downcase).where.not(id: @current_user.id).exists?
          render json: { error: 'Username is already taken' }, status: :conflict
          return
        end
        
        @current_user.update(username: new_username)
        render json: { user: { username: @current_user.username } }, status: :ok
      else
        render json: { error: 'Username is required' }, status: :bad_request
      end
    end

    def user_exists
      user = User.find_by(username: params[:username])
      if user
        render json: { exists: true, id: user.id }
      else
        render json: { exists: false }
      end
      
      # Disable caching
      response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
      response.headers['Pragma'] = 'no-cache'
      response.headers['Expires'] = '0'
    end

    def leaderboard
      top_users = User.order(points: :desc).limit(25)
      render json: top_users, only: [:username, :points]
    end

  end
end
