Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  root 'application#react_app'
  get "up" => "rails/health#show", as: :rails_health_check
  get '*path', to: 'application#react_app'
end
