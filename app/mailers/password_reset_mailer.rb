# app/mailers/password_reset_mailer.rb
class PasswordResetMailer < ApplicationMailer
    def password_reset_email(user, reset_token)
      @reset_token = reset_token
      @reset_url = edit_password_reset_url(reset_token: reset_token, host: 'your-domain.com', protocol: 'https') # Replace 'your-domain' with your actual domain or use 'localhost:3000' for development
      mail(to: user.email, subject: 'Password Reset Request')
    end
  end
  