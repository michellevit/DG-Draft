module Api
  class UsersController < ApplicationController
    include Tokenable
    
    def update_username
      token = request.headers['Authorization']&.split(' ')&.last
      @current_user = authenticate_token(token) if token
      if @current_user
        requested_username = params[:username]
        if @current_user.username == requested_username
          render json: { error: 'New username cannot be the same as the current one.' }, status: :unprocessable_entity
        else
          @current_user.username = requested_username
          if @current_user.save(validate: false)
            render json: { user: @current_user }
          else
            render json: { error: @current_user.errors.full_messages.join(', ') }, status: :unprocessable_entity
          end
        end
      else
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    end

    def user_exists
      user = User.find_by(username: params[:username])
      if user
        render json: { exists: true, id: user.id }
      else
        render json: { exists: false }, status: :not_found
      end
    end

    def leaderboard
      top_users = User.order(points: :desc).limit(25)
      render json: top_users, only: [:username, :points]
    end

  end
end
