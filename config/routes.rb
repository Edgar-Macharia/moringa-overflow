Rails.application.routes.draw do
  resources :upvotes
  resources :downvotes
  resources :notifications
  resources :reported_contents
  resources :comments
  resources :answers
  resources :tags
  resources :questions
  resources :users, only: [:create, :show, :update]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#create'
  # Defines the root path route ("/")
  # root "articles#index"
end
