class CreatePasswordResetRequests < ActiveRecord::Migration
  def change
    create_table :password_reset_requests, id: false do |t|
      t.belongs_to :user
      t.string :link
      t.timestamps
    end
  end
end
