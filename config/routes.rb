Rails.application.routes.draw do
  resources :upvotes
  resources :downvotes
  resources :notifications
  resources :reported_contents
  resources :comments
  resources :answers
  resources :tags
  resources :questions
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
