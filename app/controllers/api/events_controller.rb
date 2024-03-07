module Api
    class EventsController < ApplicationController
      def index
        @events = Event.where(event_date_start: Date.current.beginning_of_year..Date.current.end_of_year)
        render json: @events
      end
    end
  end