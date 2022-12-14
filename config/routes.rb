Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create, :show, :index, :update]
    resources :servers, only: [:create, :destroy, :show, :index, :update]
    resources :dchannels, only: [:create, :show, :index]
    resources :channels, only: [:create, :destroy, :show, :index, :update]
    resources :messages, only: [:create, :destroy, :show, :update, :index]
    resources :dmessages, only: [:create, :destroy, :show, :update, :index]
    resources :server_members, only: [:create, :destroy, :show, :index]
    resource :session, only: [:show, :create, :destroy]
  end

  get '*path', to: 'static_pages#frontend_index'
  mount ActionCable.server => "/cable"

end
