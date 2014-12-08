class CreateWishlistItems < ActiveRecord::Migration
  def change
    create_table :wishlist_items do |t|

      t.timestamps

      t.string :title
      t.string :kind
      t.belongs_to :user

    end
  end
end
