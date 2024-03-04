module Tokenable
  extend ActiveSupport::Concern
  
  def generate_token(user_id)
    payload = { user_id: user_id, exp: 24.hours.from_now.to_i }
    hmac_secret = ENV['JWT_SECRET_KEY'] 

    JWT.encode(payload, hmac_secret, 'HS256')
  end

  def authenticate_token(token)
    hmac_secret = ENV['JWT_SECRET_KEY']
    begin
      decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
      user_id = decoded_token[0]['user_id'] 
      @current_user = User.find_by(id: user_id)
      return @current_user if user_id.present? && @current_user
    rescue JWT::DecodeError
      return { error: 'Invalid token format' }
    rescue JWT::ExpiredSignature
      return { error: 'Token has expired' }
    end
  end

end