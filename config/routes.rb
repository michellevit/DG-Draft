Rails.application.routes.draw do
  namespace :api do
    post '/sessions', to: 'sessions#attempt_login'
    delete :logout, to: "sessions#logout"
    get :authenticate_user, to: "sessions#authenticate_user"
    post '/registrations', to: 'registrations#create_user'
    resources :events, only: [:index]
    resources :users do
      patch 'update_username', on: :member
      get 'user_exists', on: :collection
    end
    get 'leaderboard', to: 'users#leaderboard'
    resources :challenges, only: [:create] do
      collection do
        get 'current/:user_id', to: 'challenges#current_for_user'
        get 'past/:user_id', to: 'challenges#past_for_user'
      end
    end
  end


  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check
  get '*path', to: 'application#react_app'
end