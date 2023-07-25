class ReportedContentsController < ApplicationController
  before_action :set_reported_content, only: %i[ show edit update destroy ]

  # GET /reported_contents or /reported_contents.json
  def index
    @reported_contents = ReportedContent.all
  end

  # GET /reported_contents/1 or /reported_contents/1.json
  def show
  end

  # GET /reported_contents/new
  def new
    @reported_content = ReportedContent.new
  end

  # GET /reported_contents/1/edit
  def edit
  end

  # POST /reported_contents or /reported_contents.json
  def create
    @reported_content = ReportedContent.new(reported_content_params)

    respond_to do |format|
      if @reported_content.save
        format.html { redirect_to reported_content_url(@reported_content), notice: "Reported content was successfully created." }
        format.json { render :show, status: :created, location: @reported_content }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @reported_content.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /reported_contents/1 or /reported_contents/1.json
  def update
    respond_to do |format|
      if @reported_content.update(reported_content_params)
        format.html { redirect_to reported_content_url(@reported_content), notice: "Reported content was successfully updated." }
        format.json { render :show, status: :ok, location: @reported_content }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @reported_content.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /reported_contents/1 or /reported_contents/1.json
  def destroy
    @reported_content.destroy

    respond_to do |format|
      format.html { redirect_to reported_contents_url, notice: "Reported content was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reported_content
      @reported_content = ReportedContent.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def reported_content_params
      params.require(:reported_content).permit(:user_id, :content_type, :content_id, :reason, :is_handled)
    end
end
