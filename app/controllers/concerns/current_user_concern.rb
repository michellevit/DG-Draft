# app/controllers/concerns/current_user_concern.rb
module CurrentUserConcern
    extend ActiveSupport::Concern
    
    included do
      before_action :set_current_user
    end
  
    private
  
    def set_current_user
      if session[:user_id]
        @current_user = User.find_by(id: session[:user_id])
        Rails.logger.info "CurrentUserConcern: Found user by session: #{@current_user.inspect}"
      else
        authenticate_with_token
      end
    end
  
    def authenticate_with_token
      auth_header = request.headers['Authorization']
      token = auth_header.split(' ').last if auth_header
      if token
        begin
          # Your existing token authentication logic
          Rails.logger.info "CurrentUserConcern: Found user by token: #{@current_user.inspect}"
        rescue JWT::DecodeError, JWT::ExpiredSignature
          Rails.logger.error "CurrentUserConcern: Token authentication failed"
        end
      end
    end
  end