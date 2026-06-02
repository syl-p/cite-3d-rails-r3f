class Admin::PartsController < Admin::BaseController
  before_action :set_part, only: %i[ edit update destroy ]

  def index
    @parts = Part.all
    render inertia: "admin/parts/index", props: {
      parts: PartResource.new(@parts).to_h
    }
  end

  def new
    @part = Part.new
    render inertia: "admin/parts/new", props: {
      part: PartResource.new(@part).to_h
    }
  end

  def edit
    render inertia: "admin/parts/edit", props: {
      part: PartResource.new(@part).to_h
    }
  end

  def create
    @part = Part.new(part_params)

    if @part.save
      render inertia: "admin/parts/edit", props: {
        part: PartResource.new(@part).to_h
      }, notice: "Part was successfully created."
    else
      redirect_to request.referrer, inertia: { errors: @part.errors }
    end
  end

  def update
    if @part.update(part_params)
      redirect_to request.referrer, notice: "Part was successfully updated."
    else
      redirect_to request.referrer, inertia: { errors: @part.errors }
    end
  end

  def destroy
    @part.destroy!

    flash[:notice] = "Part was successfully destroyed."
    redirect_to admin_parts_url, notice: "Part was successfully destroyed."
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_part
    @part = Part.includes(comments: :user).find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def part_params
    params.require(:part).permit(:object_name, :description, :body, :title)
  end
end
