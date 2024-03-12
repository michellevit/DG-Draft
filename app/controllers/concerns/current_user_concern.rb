# app/controllers/concerns/current_user_concern.rb
module CurrentUserConcern
    extend ActiveSupport::Concern
    
    included do
      before_action :set_current_user
    end
  
    private
  
    def set_current_user
      # Attempt to authenticate using session first
      @current_user = User.find(session[:user_id]) if session[:user_id]  
      # Fallback to token authentication if session not present
      authenticate_with_token unless @current_user
    end
  
    def authenticate_with_token
      auth_header = request.headers['Authorization']
      token = auth_header.split(' ').last if auth_header
      if token
        hmac_secret = ENV['JWT_SECRET_KEY']
        begin
          decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
          user_id = decoded_token[0]['user_id']
          @current_user = User.find_by(id: user_id)
        rescue JWT::DecodeError, JWT::ExpiredSignature
          # Handle token authentication errors (e.g., logging, error response)
        end
      end
    end
  end
  