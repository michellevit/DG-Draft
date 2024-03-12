# app/controllers/concerns/current_user_concern.rb
module CurrentUserConcern
  extend ActiveSupport::Concern
  include TokenableConcern # Ensure this concern is included
  
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
      @current_user, error_message = authenticate_token(token) # Use the method from TokenableConcern
      if @current_user
        Rails.logger.info "CurrentUserConcern: Found user by token: #{@current_user.inspect}"
      else
        Rails.logger.error "CurrentUserConcern: Token authentication failed - #{error_message}"
      end
    else
      Rails.logger.info "CurrentUserConcern: No authorization token found"
    end
  end
end
