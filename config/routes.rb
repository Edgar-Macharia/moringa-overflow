Rails.application.routes.draw do
  resources :upvotes
  resources :downvotes
  resources :notifications
  resources :reported_contents
  resources :comments
  resources :answers
  resources :tags
  resources :questions do
    collection do
      get 'search', to: 'questions#search'
    end
  end
  resources :users, only: [:create, :show, :update] do
    member do
      put :reset_password
    end
  end

  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#create'
  get "/questions/search", to: "questions#search"

  # Defines the root path route ("/")
  # root "articles#index"
end
