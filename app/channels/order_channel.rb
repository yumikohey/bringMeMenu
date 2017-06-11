class OrderChannel < ApplicationCable::Channel
  def subscribed
    stream_from "restaurant-#{params['slug']}:orders"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def purchase(params)
  	slug = params["order"]["slug"]
  	restaurant_id = Restaurant.where(slug:slug).first().id
  	items = params["order"]["items"]
  	table_number = params["order"]["table_number"]
  	Order.create!(items: items, restaurant_id: restaurant_id, table_number: table_number)
  end

  def update_order(params)
    all_completed = true
    update_item_id = params["order"]["itemId"]
    update_item_complete = !params["order"]["complete"]
    order_number = params["order"]['order_number']
    order = Order.where({order_number:order_number}).first()
    items = order["items"]
    items[update_item_id]["done"] = update_item_complete
    items.each do |key, value|
      all_completed = !items[key]["done"] ? false : true
    end
    status = all_completed ? "done" : "ordered"
    order.update!({items: items, status: status})
  end

end
