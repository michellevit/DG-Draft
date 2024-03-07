Rails.application.routes.draw do
  namespace :api do
    post '/sessions', to: 'sessions#attempt_login'
    delete :logout, to: "sessions#logout"
    get :authenticate_user, to: "sessions#authenticate_user"
    post '/registrations', to: 'registrations#create_user'
    resources :users do
      patch 'update_username', on: :member
    end
    get 'leaderboard', to: 'users#leaderboard'
  end

  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check
  get '*path', to: 'application#react_app'
end