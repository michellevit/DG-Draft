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

    # Deletes the challenge
    def destroy
      challenge = Challenge.find(params[:id])
      if challenge.challenger == @current_user && challenge.status == "Pending"
        challenge.destroy
        render json: { message: "Challenge deleted successfully." }, status: :ok
      else
        render json: { error: "You cannot delete this challenge." }, status: :forbidden
      end
    end

    # Changes challenge status to accepted
    def accept
      update_status(params[:id], "Accepted")
    end

    # Changes challenge status to declined
    def decline
      update_status(params[:id], "Declined")
    end    
    
    # Gets current challenges for the user
    def current_for_user
      current_challenges = Challenge.includes(:event, :challenger, :challengee)
                                    .joins(:event)
                                    .where("events.event_date_end >= ?", Date.today)
                                    .where("challenger_id = ? OR challengee_id = ?", @current_user.id, @current_user.id)
    
      render json: current_challenges.as_json(include: {
        event: { only: [:event_name, :event_date_start, :event_date_end] },
        challenger: { only: :username },
        challengee: { only: :username }
      })
    end
    

    # Gets past challenges for the user
    def past_for_user
      past_challenges = Challenge.includes(:event, :challenger, :challengee)
                                 .joins(:event)
                                 .where("events.event_date_end < ?", Date.today)
                                 .where("challenger_id = ? OR challengee_id = ?", @current_user.id, @current_user.id)
    
      render json: past_challenges.as_json(include: {
        event: { only: [:event_name, :event_date_start, :event_date_end] },
        challenger: { only: :username },
        challengee: { only: :username }
      })
    end
    

    private

    def challenge_params
      params.require(:challenge).permit(:event_id, :division, :challenger_id, :challengee_id, :start_condition)
    end

    def verify_current_user
      render json: { error: "User not found" }, status: :not_found unless @current_user
    end

    def update_status(challenge_id, new_status)
      challenge = Challenge.find(challenge_id)
      if challenge.challengee == @current_user && challenge.status == "Pending"
        challenge.update(status: new_status)
        render json: { message: "Challenge #{new_status.downcase}." }, status: :ok
      else
        render json: { error: "Action not allowed." }, status: :forbidden
      end
    end

  end
end
