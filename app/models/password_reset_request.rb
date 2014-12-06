class PasswordResetRequest < ActiveRecord::Base
  belongs_to :user

  def is_valid?
    30.minutes.ago < created_at 
  end

  def fulfill new_password
    user.password = new_password
    user.password_confirmation = new_password
    user.save
  end
end
