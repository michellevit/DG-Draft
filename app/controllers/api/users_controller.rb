module Api
  class UsersController < ApplicationController
    include TokenableConcern
    
    def update_username
      token = request.headers['Authorization']&.split(' ').last
      user, error = authenticate_token(token) if token
      
      if user
        @current_user = user
      else
        render json: { error: error || 'Invalid token' }, status: :unauthorized
      end
    end

    def user_exists
      # Log the input username
      Rails.logger.error "Checking user existence for username: #{params[:username]}"

      user = User.find_by(username: params[:username])

      if user
        # Log the found user
        Rails.logger.error "User exists. ID: #{user.id}, Username: #{user.username}"
        render json: { exists: true, id: user.id }
      else
        # Log the case where no user is found
        Rails.logger.error "No user found with username: #{params[:username]}"
        render json: { exists: false }, status: :not_found
      end
    end


    def leaderboard
      top_users = User.order(points: :desc).limit(25)
      render json: top_users, only: [:username, :points]
    end

  end
end
