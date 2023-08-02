Rails.application.routes.draw do
  namespace :api do
    resources :notifications, only: [:index]
    patch 'notifications/mark_as_read/:id', to: 'notifications#mark_as_read', as: :mark_notification_as_read
  end


  resources :upvotes
  resources :downvotes
 resources :notifications, only: [:index]
  resources :reported_contents
  resources :comments
  resources :answers