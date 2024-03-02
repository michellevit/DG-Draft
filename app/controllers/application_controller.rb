class ApplicationController < ActionController::Base

  skip_before_action :verify_authenticity_token  

  def react_app
      render file: Rails.root.join('public', 'index.html'), layout: false, content_type: 'text/html'
  end

end