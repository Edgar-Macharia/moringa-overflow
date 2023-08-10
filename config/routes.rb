Rails.application.routes.draw do
  # Defines the root path route ("/")

  resources :users, only: [:create, :show, :update] do
    member do
      get 'favorite_questions', to: 'users#favorite_questions'
      put :reset_password
      post 'update_profile_picture'
      put 'ban', to: 'users#ban'
    end
  end
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#create'
  post '/api/password-reset', to: 'reset#request_reset'
  put '/PasswordResetPage/:reset_token', to: 'reset#reset_password', as: 'password_reset_page'

  resources :notifications, only: [:index, :update]
  resources :reported_contents, only: [:index, :create, :update]

  resources :tags, only: [:index, :show, :create,]
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
  
  resources :users do
    member do
      get 'favorite_questions', to: 'users#favorite_questions'
      put :reset_password
      
      post 'update_profile_picture'
    end
  end

  put 'users/:id/update_moderator_status', to: 'users#update_moderator_status'


  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#create'
  get "/questions/search", to: "questions#search"
  delete '/questions', to: 'questions#destroy'

  resources :answers do
    member do
      post 'upvote', to: 'answers#upvote'
      post 'downvote', to: 'answers#downvote'
    end
  end
end
