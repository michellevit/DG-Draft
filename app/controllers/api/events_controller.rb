module Api
  class EventsController < ApplicationController
    def index
      @events = Event.where('event_date_start BETWEEN ? AND ?', Date.current.beginning_of_year, Date.current.end_of_year)
                     .where('event_date_end >= ?', Date.current)
                     .order(:event_date_start)
      render json: @events.as_json(methods: :formatted_name)
    end
  end
end