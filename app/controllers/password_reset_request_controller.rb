class PasswordResetRequestController < ApplicationController

  # Show password reset request
  def new

  end

  # Create the request and email for verification
  def create
    email = params[:reset][:email]
    user = User.find_by(email: email)

    if user
      @hash = Digest::SHA1.hexdigest("#{user.email}-#{DateTime.now.strftime("%M%S%L")}").to_s
      reset_request = PasswordResetRequest.new
      reset_request.user = user
      reset_request.link = @hash
      puts @hash
      if reset_request.save
        @fulfill_link = "/password_reset_request/#{@hash}"
        PasswordResetMailer.link_to_reset_password(@fulfill_link, user).deliver
        redirect_to "/login"
      else
        render code: 500, text: "Unable to create code"
      end
    else
      render code: 400, text: "Cannot find user: #{email}" 
    end
  end

  # Redeem the reset code
  def show
    @reset_request = PasswordResetRequest.find_by(link: params[:id])
  end

  def update
    @reset_request = PasswordResetRequest.find_by(link: params[:id])
    new_password = params[:reset][:new_password]
    puts new_password
    puts @reset_request
    puts @reset_request.is_valid?
    puts @reset_request.user
    if new_password and not @reset_request.nil? and @reset_request.is_valid?
      @reset_request.fulfill new_password
      redirect_to "/login"
    end
  end
end
