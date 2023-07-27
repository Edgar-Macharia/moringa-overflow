require 'jwt'
class ApplicationController < ActionController::API
    # skip_before_action :verify_authenticity_token
      before_action :authorize_request
    
      private
    
      def authorize_request
            header = request.headers['Authorization']
            if header.present?
              token = header.split(' ').last
              begin
                decoded = JWT.decode(token, Rails.application.secrets.secret_key_base, true, { algorithm: 'HS256' }).first
                @current_user = User.find(decoded['user_id'])
                if decoded['exp'].to_i < Time.now.to_i
                  render json: { error: 'Token has expired' }, status: :unauthorized
                end
              rescue JWT::DecodeError
                render json: { error: 'Invalid token' }, status: :unauthorized
              rescue ActiveRecord::RecordNotFound
                render json: { error: 'User not found' }, status: :unauthorized
              end
            else
              render json: { error: 'Missing token' }, status: :unauthorized
            end
      end
          
      def current_user
        @current_user
      end
end