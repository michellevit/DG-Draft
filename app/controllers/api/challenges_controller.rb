module Api
  class ChallengesController < ApplicationController
    before_action :set_user, only: [:current_for_user, :past_for_user]

    def create
      challenge = Challenge.new(challenge_params)
      if challenge.save
        render json: challenge, status: :created
      else
        render json: challenge.errors, status: :unprocessable_entity
      end
    end
    
    # Gets current challenges for the user
    def current_for_user
      if @user
        current_challenges = Challenge.where("event_date_end > ?", Date.today)
                                      .where("challenger_id = ? OR challengee_id = ?", @user.id, @user.id)
        render json: current_challenges
      else
        render json: { error: "User not found" }, status: :not_found
      end
    end

    # Gets past challenges for the user
    def past_for_user
      if @user
        past_challenges = Challenge.where("event_date_end <= ?", Date.today)
                                    .where("challenger_id = ? OR challengee_id = ?", @user.id, @user.id)
        render json: past_challenges
      else
        render json: { error: "User not found" }, status: :not_found
      end
    end

    private

    def challenge_params
      params.require(:challenge).permit(:event_id, :challenger_id, :challengee_id, :start_condition)
    end
    
    def set_user
      @user = User.find(params[:user_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "User not found" }, status: :not_found
    end
  
  end
  
end