class SignupMailer < ActionMailer::Base
  default from: "market@uwmmarket.herokuapp.com"

  def signup(user)
    @user = user
    mail to: @user.email, subject: "Hey there"
  end
end
