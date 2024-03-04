class SessionsController < ApplicationController
    include CurrentUserConcern
    include Tokenable

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
      token = params[:token]
      @current_user = authenticate_token(token) if token
      if @current_user
        render json: {
          valid: true,
          user: @current_user
        }
      else
        render json: {
          valid: false,
          error: 'Invalid token'
        }
      end
    end

    # logout -> logs the user out
    def logout 
        reset_session
        render json: { status: 200, logged_out: true }
    end

end