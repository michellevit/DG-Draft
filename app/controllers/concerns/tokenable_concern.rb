# app/controllers/concerns/tokenable_concern.rb
module TokenableConcern
  extend ActiveSupport::Concern

  # Generates a JWT token for a given user ID
  def generate_token(user_id)
    payload = { user_id: user_id, exp: 24.hours.from_now.to_i }
    hmac_secret = ENV['JWT_SECRET_KEY']
    JWT.encode(payload, hmac_secret, 'HS256')
  end

  # Validates a given JWT token and returns the associated user if valid
  def authenticate_token(token)
    hmac_secret = ENV['JWT_SECRET_KEY']
    begin
      decoded_token = JWT.decode(token, hmac_secret, true, { algorithm: 'HS256' })
      user_id = decoded_token[0]['user_id']
      user = User.find_by(id: user_id)
      
      # Instead of setting @current_user, just return the user object
      return user if user_id.present? && user
    rescue JWT::DecodeError
      # Handle or log token format errors without setting @current_user
      return nil, 'Invalid token format'
    rescue JWT::ExpiredSignature
      # Handle or log expired token errors without setting @current_user
      return nil, 'Token has expired'
    end

    # Return nil if no user is found or token is invalid
    nil
  end
end
