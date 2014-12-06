class AuthenticationController < ApplicationController

  def authenticate
    redirect_to action: 'login', failure: true if params[:session].nil?
    
    email = params[:session][:email]
    password = params[:session][:password]
    user = User.find_by(email: email)

    if user and user.authenticate password
      session[:id] = user.id
      redirect_to "/"
    else
      redirect_to action: 'login', failure: true
    end
  end


  def login
    @failed_attempt = false
    @failed_attempt |= params[:failure]
  end

  def signup
    
  end

  def signupHook
    name = params[:session][:name]
    phone = params[:session][:phone]
    zipcode = params[:session][:zipcode]
    email = params[:session][:email]
    password = params[:session][:password]

    new_user = User.new name: name, phone: phone, zipcode: zipcode, email: email, password: password, password_confirmation: password

    if new_user.save
      SignupMailer.signup(new_user).deliver
      redirect_to "/" if new_user
    else
      
      render status: 403, json: new_user.errors.messages
    end
  end
  
end
