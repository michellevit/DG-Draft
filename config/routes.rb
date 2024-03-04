Rails.application.routes.draw do
  post '/sessions', to: 'sessions#attempt_login'
  resources :registrations, only: [:create_user]
  delete :logout, to: "sessions#logout"
  get :authenticate_user, to: "sessions#authenticate_user"
  root 'application#react_app'
  resources :users do
    patch 'update_username', on: :member
  end
  get "up" => "rails/health#show", as: :rails_health_check
  get '*path', to: 'application#react_app'
end
