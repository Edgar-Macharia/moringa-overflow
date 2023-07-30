# This file is used by Rack-based servers to start the application.

require_relative "config/environment"



# use Rack::Cors do
#     allow do
#       origins 'localhost:5173', '127.0.0.1:5173',
#               /\Ahttp:\/\/192\.168\.0\.\d{1,3}(:\d+)?\z/
#               # regular expressions can be used here
  
#       resource '/file/list_all/', :headers => 'x-domain-token'
#       resource '/file/at/*',
#           methods: [:get, :post, :delete, :put, :patch, :options, :head],
#           headers: 'x-domain-token',
#           expose: ['Some-Custom-Response-Header'],
#           max_age: 600
#           # headers to expose
#     end
  
#     allow do
#       origins '*'
#       resource '/public/*', headers: :any, methods: :get
  
#       # Only allow a request for a specific host
#       resource '/api/v1/*',
#           headers: :any,
#           methods: :get,
#           if: proc { |env| env['HTTP_HOST'] == 'api.example.com' }
#     end
#   end



run Rails.application
Rails.application.load_server