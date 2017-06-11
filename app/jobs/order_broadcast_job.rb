class OrderBroadcastJob < ApplicationJob
  queue_as :default

  def perform(response, slug)
    ActionCable.server.broadcast "restaurant-#{slug}:orders", response: ActiveSupport::JSON.decode(response)
  end

end
