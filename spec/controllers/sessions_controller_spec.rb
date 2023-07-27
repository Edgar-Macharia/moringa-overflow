# require 'rails_helper'

# RSpec.describe SessionsController, type: :controller do
#   let(:user) { create(:user) } # Assuming you have a user factory set up

#   describe 'POST #create' do
#     it 'returns an authentication token on successful login' do
#       post :create, params: { email: user.email, password_digest: user.password }
#       expect(response).to have_http_status(:ok)
#       expect(json_response).to have_key('token')
#       expect(json_response).to have_key('user')
#     end

#     it 'returns unauthorized for invalid credentials' do
#       post :create, params: { email: user.email, password_digest: 'wrong_password' }
#       expect(response).to have_http_status(:unauthorized)
#       expect(json_response['error']).to eq('Invalid email or password')
#     end
#   end

#   describe 'DELETE #destroy' do
#     it 'logs out the user' do
#       session[:user_id] = user.id
#       delete :destroy
#       expect(response).to have_http_status(:success)
#       expect(session[:user_id]).to be_nil
#     end
#   end

#   describe 'GET #is_logged_in?' do
#     context 'when user is logged in' do
#       before { session[:user_id] = user.id }

#       it 'returns logged_in: true' do
#         get :is_logged_in?
#         expect(response).to have_http_status(:success)
#         expect(json_response['logged_in']).to be true
#         expect(json_response['user']).to eq(user.as_json)
#       end
#     end

#     context 'when user is not logged in' do
#       it 'returns logged_in: false' do
#         get :is_logged_in?
#         expect(response).to have_http_status(:success)
#         expect(json_response['logged_in']).to be false
#         expect(json_response['user']).to be_nil
#       end
#     end
#   end

#   # Helper method to parse JSON response
#   def json_response
#     JSON.parse(response.body)
#   end
# end
