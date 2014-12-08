class WishlistitemsController < ApplicationController
  before_filter :getUser, :userPermission?

  def index
    user_id = params[:user_id]

    wishlistitems = WishlistItem.all
    wishlistitems = User.find(user_id).wishlist_items if user_id

    render json: wishlistitems.to_json()
  end

  def show
    user_id = params[:user_id]
    wishlistitem_id = params[:id]

    wishlistitems = user_id ? User.find(user_id).wishlistItems : WishlistItem.all
    wishlistitem = wishlistitems.find_by_id wishlistitem_id

    unless wishlistitem.nil?
      render json: wishlistitem.to_json
    else
      render status: 404, text: "Wishlist Item not found"

      end
  end

  def create
    user = User.find_by_id params[:user_id]

    if user
      wishlistitems = WishlistItem.create wishlistitems_params

      render status: 200, json: wishlistitems.to_json
    else
      render status: 403, text: "Wishlist Item needs to have a User"
    end
  end

  def update
    puts "hello?  I'm guessing this still needs to be done ;)"
  end

  def destroy
    wishlistitems = WishlistItem.find_by_id params[:id]

    if wishlistItems
      render status: 200, json: wishlistitems.to_json
      wishlistitems.destroy
    else
      render status: 404, text: "Wishlist Item not found"
    end
  end

  private
  def wishlistitems_params
    params.delete :wishlistItem
    params.permit(:user_id, :title, :kind)
  end

  def userPermission?
    puts params[:user_id] == @user.id
  end

end