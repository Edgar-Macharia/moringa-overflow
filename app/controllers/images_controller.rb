#   # app/controllers/images_controller.rb
# class ImagesController < ApplicationController
#     def create
#       uploaded_image = params[:image]
#       cloudinary_response = Cloudinary::Uploader.upload(uploaded_image.tempfile.path)
#       image_url = cloudinary_response['secure_url']
  
#       # Save the 'image_url' to the database using the model you created.
#       image = Image.create(url: image_url)
  
#       render json: { url: image_url }
#     end

#     def index
#         images = Image.all
#         render json: { images: images }
#       end
#   end
  