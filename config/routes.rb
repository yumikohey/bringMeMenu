Rails.application.routes.draw do
  resources :restaurants do
  	match '/register', to: 'restaurants/restaurant_employees/registrations#new', via: [:get]
    match '/profile', to: 'restaurants#profile', via: [:get]
    match '/get_profile', to: 'restaurants#get_profile', via: [:get]
    match '/update_restaurant_profile', to: 'restaurants#update_restaurant_profile', via: [:put]
    match '/main', to: 'restaurants#main', via: [:get]
    match '/daily', to: 'restaurants#daily', via: [:get]
    match '/menu', to: 'menus#index', via: [:get]
    match '/get_items_from_menu', to: 'menus#get_items_from_menu', via: [:get]
    match '/qr', to: 'qrs#index', via: [:get]
    match '/orders', to: 'restaurants#kitchen', via: [:get]
  	member do
  		devise_for :restaurant_employees, :controllers => { 
        registrations: 'restaurants/restaurant_employees/registrations'
      }
  	end
  end

  get '/menu/:restaurant_slug', to: 'menus#order'
  post '/menu/:restaurant_slug', to: 'menus#order'

  scope 'v1' do
    post '/add_item', to: 'items#add_item_to_menu'
    put '/update_item', to: 'items#update_item'
    post '/add_qr_code', to: 'qrs#add_qr_code'
    get '/qr_codes', to: 'qrs#get_active_qr_codes'
    get '/:restaurant_slug/menu', to: 'menus#get_items_from_menu'
    post '/place_order', to: 'orders#place_order'
    get '/get_slug', to: 'restaurants#get_slug'
    get '/get_orders', to: 'restaurants#get_orders'
    put '/update_order', to: 'restaurants#update_order'
  end
	root to: 'hello_world#index'
  get 'hello_world', to: 'hello_world#index'

  mount ActionCable.server => '/cable'
end