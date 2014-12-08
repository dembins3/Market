class WishlistItem < ActiveRecord::Base
  belongs_to :user

  validates :kind, inclusion: { in: %w(game book movie music) }
  validates :title, presence: true

end
