class Parts::MediaController < ApplicationController
  def create
    @medium = Medium.new(user: Current.user)
    @medium.part_id = params[:id]
    @medium.file.attach(params[:file])

    if @medium.save
      redirect_to part_path(params[:id])
    else
      # render json: { errors: @medium.errors }, status: :unprocessable_entity
      redirect_to request.referrer, inertia: { errors: @medium.errors }
    end
  end
end
