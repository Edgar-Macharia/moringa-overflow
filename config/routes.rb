Rails.application.routes.draw do
  # namespace :api do
  #   resources :notifications, only: [:index]
  #   patch 'notifications/mark_as_read/:id', to: 'notifications#mark_as_read'
  # end
   post '/api/password-reset', to: 'reset#request_reset'
   post '/password-reset', to: 'reset#request_reset'
   put '/PasswordResetPage/:reset_token', to: 'reset#reset_password', as: 'password_reset_page'
  # get '/api/password-reset', to: 'reset#reset_password', as: :reset_password
  # get '/PasswordResetPage/:reset_token', to: 'reset#reset_password', as: 'password_reset_page'
  # get 'api/password-reset', to: 'reset#reset_password', as: :password_reset_page
  put 'api/password-reset/:reset_token', to: 'reset#reset_password', as: :reset_password
  resources :notifications, only: [:index, :update]
  resources :reported_contents
  resources :comments
  resources :answers do
    member do
      post 'upvote', to: 'answers#upvote'
      post 'downvote', to: 'answers#downvote'
    end
  end

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
      post 'update_profile_picture'
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
