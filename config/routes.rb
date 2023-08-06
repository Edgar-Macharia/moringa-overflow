Rails.application.routes.draw do
  namespace :api do
    resources :notifications, only: [:index]
    patch 'notifications/mark_as_read/:id', to: 'notifications#mark_as_read', as: :mark_notification_as_read
  end
  
  resources :notifications, only: [:index]
  resources :reported_contents
  resources :comments
  resources :answers
  resources :tags

  resources :questions do
    collection do
      get 'search', to: 'questions#search'
    end
    member do
      get 'answers', to: 'questions#answers'
      
      post 'upvote', to: 'questions#upvote'
      post 'downvote', to: 'questions#downvote'
      post 'favorite', to: 'questions#favorite'
    end
  end
  
  resources :users, only: [:create, :show, :update] do
    member do
      get 'favorite_questions', to: 'users#favorite_questions'
      put :reset_password
    end
  end

  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#create'
  get "/questions/search", to: "questions#search"
  delete '/questions', to: 'questions#destroy'
  
  # Defines the root path route ("/")
  # root "articles#index"

  # namespace :api do
  #   resources :notifications, only: [:index]
  #   patch 'notifications/mark_as_read/:id', to: 'notifications#mark_as_read', as: :mark_notification_as_read
  # end
end
