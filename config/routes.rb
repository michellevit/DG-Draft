Rails.application.routes.draw do
  resources :sessions, only: [:attempt_login]
  resources :registrations, only: [:create_user]
  delete :logout, to: "sessions#logout"
  get :authenticate_token, to: "sessions#authenticate_token"
  root 'application#react_app'
  resources :users do
    patch 'update_username', on: :member
  end
  get "up" => "rails/health#show", as: :rails_health_check
  get '*path', to: 'application#react_app'
end
