Rails.application.routes.draw do
  get "comments/update"
  get "comments/destroy"
  get "inertia-example", to: "inertia_example#index"
  resource :session
  resources :passwords, param: :token
  resources :parts
  root "inertia_example#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  scope "parts" do
    post ":id/media", to: "parts/media#create"
    post ":id/comments", to: "parts/comments#create"
  end
end
