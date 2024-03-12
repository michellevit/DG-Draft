module Api
    class RegistrationsController < ApplicationController
        include TokenableConcern
        
        def create_user
            user = User.new(
                email: params['user']['email'],
                password: params['user']['password'],
                password_confirmation: params['user']['password_confirmation'],
                username: generate_unique_username
            )

            if user.save
                token = generate_token(user.id)
                render json: {
                    status: :created,
                    user: user,
                    token: token 
                }
            else
                render json: {
                    status: 422, 
                    errors: user.errors.full_messages
                }, status: :unprocessable_entity
            end
        end
        
        private
        
        def generate_unique_username
            loop do
            username = generate_username
            break username unless User.exists?(username: username)
            end
        end

        def generate_username
            "someone-#{rand(0..99999)}"
        end
    end
end