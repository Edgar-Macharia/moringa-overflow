# config/initializers/sendgrid.rb
require 'sendgrid-ruby'

SendGrid::API_KEY = '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'

ActionMailer::Base.smtp_settings = {
  address: 'smtp.sendgrid.net',
  port: 587,
  domain: 'your-domain.com', # Replace with your actual domain or leave as is
  user_name: 'apikey',
  password: ENV['SENDGRID_API_KEY'], # Use the environment variable
  authentication: :plain,
  enable_starttls_auto: true
}
