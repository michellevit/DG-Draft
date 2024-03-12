module Api
  class ChallengesController < ApplicationController
    include CurrentUserConcern

    before_action :verify_current_user, only: [:current_for_user, :past_for_user]

    def create
      challenge = Challenge.new(challenge_params.merge(user_id: @current_user.id))
      if challenge.save
        render json: challenge, status: :created
      else
        render json: challenge.errors, status: :unprocessable_entity
      end
    end
    
    # Gets current challenges for the user
    def current_for_user
      Rails.logger.info "Entering current_for_user method"
      begin
        current_challenges = Challenge.where("event_date_end > ?", Date.today)
                                      .where("challenger_id = ? OR challengee_id = ?", @current_user.id, @current_user.id)
        Rails.logger.info "Current challenges fetched successfully"
        render json: current_challenges
      rescue => e
        Rails.logger.error "Error fetching current challenges: #{e.message}"
        render json: { error: e.message }, status: :internal_server_error
      end
    end

    # Gets past challenges for the user
    def past_for_user
      past_challenges = Challenge.where("event_date_end <= ?", Date.today)
                                 .where("challenger_id = ? OR challengee_id = ?", @current_user.id, @current_user.id)
      render json: past_challenges
    end

    private

    def challenge_params
      params.require(:challenge).permit(:event_id, :challenger_id, :challengee_id, :start_condition)
    end

    def verify_current_user
      render json: { error: "User not found" }, status: :not_found unless @current_user
    end
  end
end
