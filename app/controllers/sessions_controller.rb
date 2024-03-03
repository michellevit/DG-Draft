class SessionsController < ApplicationController
    include CurrentUserConcern
    include Tokenable

    # create -> logs the user in
    def create
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
    
    # logged_in -> checks if the user is logged in (by getting the status from current_user_concern)
    def logged_in
        token = request.headers['Authorization']&.split(' ')&.last
        @current_user = authenticate_token(token) if token
        if @current_user
          render json: {
            logged_in: true,
            user: @current_user
          }
        else 
          render json: {
            logged_in: false
          }
        end
    end

    # logout -> logs the user out
    def logout 
        reset_session
        render json: { status: 200, logged_out: true }
    end

end