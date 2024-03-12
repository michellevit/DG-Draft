module Api
  class SessionsController < ApplicationController
    include CurrentUserConcern
    include TokenableConcern

    # attempt_login -> attempts to log the user in with provided email/password -> if success, returns user's data
    def attempt_login
        user = User
            .find_by(email: params["user"]["email"])
            .try(:authenticate, params["user"]["password"])
        if user
            token = generate_token(user.id)
            render json: {
                status: :created,
                logged_in: true,
                user: user,
                token: token
            }
        else 
            render json: { status: 401 }
        end
    end
    
    # authenticate_token -> checks if the user is logged in -> if success, returns user's data
    def authenticate_user
      auth_header = request.headers['Authorization']
      token = auth_header.split(' ').last if auth_header
      user, error = authenticate_token(token) if token
      
      if user
        render json: { valid: true, user: user }
      else
        render json: { valid: false, error: error || 'Invalid token' }
      end
    end

    # logout -> logs the user out
    def logout 
        reset_session
        render json: { status: 200, logged_out: true }
    end
    
  end
end