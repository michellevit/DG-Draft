module Api
    class ChallengesController < ApplicationController

        def create
        challenge = Challenge.new(challenge_params)
        if challenge.save
          render json: challenge, status: :created
        else
          render json: challenge.errors, status: :unprocessable_entity
        end
      end
  
      private
  
      def challenge_params
        params.require(:challenge).permit(:event_id, :challenger_id, :challengee_id, :start_condition)
      end
    end
    
  end