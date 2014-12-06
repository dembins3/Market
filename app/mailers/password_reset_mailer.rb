class PasswordResetMailer < ActionMailer::Base
  default from: "market@uwmmarket.herokuapp.com"

  def link_to_reset_password(link, user)
    @link = "#{ENV["DOMAIN_NAME"]}/#{link}"
    @user = user
    mail to: user.email, subject: "Password Reset"
  end
end
