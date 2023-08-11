# app/mailers/sendgrid_mailer.rb

# class SendgridMailer < ApplicationMailer
#   def send_password_reset(email, reset_token)
#     @reset_token = reset_token
#     @reset_url = api_password_reset_url(reset_token: reset_token, host: 'localhost', protocol: 'https') # Replace 'your-host' with your actual host URL
#     mail(to: email, subject: 'Password Reset Request', template_path: 'sendgrid_mailer', template_name: 'send_password_reset')
#   end
# end
# class SendgridMailer < ApplicationMailer
#   def send_password_reset(email, reset_token)
#     @reset_token = reset_token
#     @reset_url = api_password_reset_url(reset_token: reset_token, host: 'localhost', protocol: 'https') # Replace 'localhost' with your actual host URL

#     mail(to: email, subject: 'Password Reset Request')
#   end
# end
 class SendgridMailer < ApplicationMailer
#   def send_password_reset(email, reset_token)
#     @reset_token = reset_token
#     @reset_url = api_password_reset_url(reset_token: reset_token, host: 'localhost:3000', protocol: 'https') # Replace 'your-host' with your actual host URL
#     mail(from: 'kelvin.kiprono@student.moringaschool.com', to: email, subject: 'Password Reset Request', template_path: 'sendgrid_mailer', template_name: 'send_password_reset')
#   end
  def send_password_reset(email, reset_token)
    @reset_token = reset_token
    @reset_url = password_reset_page_url(reset_token: reset_token, host: 'https://rails-production-9dbb.up.railway.app/', protocol: 'https') # Replace 'localhost' with your actual host URL
    mail(from: 'kelvin.kiprono@student.moringaschool.com', to: email, subject: 'Password Reset Request', template_path: 'sendgrid_mailer', template_name: 'send_password_reset')
  end
end
