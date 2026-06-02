class PartsController < ApplicationController
  allow_unauthenticated_access only: [ :index, :show ]
  before_action :set_part, only: %i[ show  ]

  def index
    @parts = Part.all

    render inertia: "parts/index", props: {
      parts: PartResource.new(@parts).to_h
    }
  end

  def show
    render inertia: "parts/show", props: {
      part: PartResource.new(@part).to_h
    }
  end


  private

  # Use callbacks to share common setup or constraints between actions.
  def set_part
    @part = Part.includes(comments: :user).find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def part_params
    params.fetch(:part, {})
  end
end
