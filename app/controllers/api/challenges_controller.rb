module Api
  class ChallengesController < ApplicationController
    include CurrentUserConcern

    before_action :verify_current_user, only: [:create, :current_for_user, :past_for_user]

    def create
      challenge = Challenge.new(challenge_params)
      if challenge.save
        render json: challenge, status: :created
      else
        Rails.logger.error("Error saving challenge: #{challenge.errors.full_messages.join(', ')}")
        render json: challenge.errors, status: :unprocessable_entity
      end
    end
    
    # Gets current challenges for the user
    def current_for_user
      current_challenges = Challenge.joins(:event)
        .where("events.event_date_end >= ?", Date.today)
        .where("challenger_id = ? OR challengee_id = ?", @current_user.id, @current_user.id)
        .select("challenges.*, events.event_date_start, events.event_date_end")
      render json: current_challenges.as_json(include: {event: {only: [:event_date_start, :event_date_end]}})
    end
    

    # Gets past challenges for the user
    def past_for_user
      past_challenges = Challenge.joins(:event)
                                 .where("events.event_date_end < ?", Date.today)
                                 .where("challenger_id = ? OR challengee_id = ?", @current_user.id, @current_user.id)
                                 .select("challenges.*, events.event_date_start, events.event_date_end")
      render json: past_challenges.as_json(include: {event: {only: [:event_date_start, :event_date_end]}})
    end
    

    private

    def challenge_params
      params.require(:challenge).permit(:event_id, :division, :challenger_id, :challengee_id, :start_condition)
    end

    def verify_current_user
      render json: { error: "User not found" }, status: :not_found unless @current_user
    end
  end
end
