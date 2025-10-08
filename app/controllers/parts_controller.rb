class PartsController < ApplicationController
  allow_unauthenticated_access only: [:index, :show]
  before_action :set_part, only: %i[ show edit update destroy ]

  # GET /parts or /parts.json
  def index
    @parts = Part.all
  end

  # GET /parts/1 or /parts/1.json
  def show
    render inertia: "parts/show", props: {
      part: @part,
      media: @part.media.map { |medium| medium.as_json },
      comments: @part.comments.map do |comment|
        {
          id: comment.id,
          content: comment.content,
          created_at: comment.created_at,
          user: {
            id: comment.user.id,
            username: comment.user.username
          }
        }
      end
    }
  end

  # GET /parts/new
  def new
    @part = Part.new
  end

  # GET /parts/1/edit
  def edit
  end

  # POST /parts or /parts.json
  def create
    @part = Part.new(part_params)

    respond_to do |format|
      if @part.save
        format.html { redirect_to @part, notice: "Part was successfully created." }
        format.json { render :show, status: :created, location: @part }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @part.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /parts/1 or /parts/1.json
  def update
    respond_to do |format|
      if @part.update(part_params)
        format.html { redirect_to @part, notice: "Part was successfully updated." }
        format.json { render :show, status: :ok, location: @part }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @part.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /parts/1 or /parts/1.json
  def destroy
    @part.destroy!

    respond_to do |format|
      format.html { redirect_to parts_path, status: :see_other, notice: "Part was successfully destroyed." }
      format.json { head :no_content }
    end
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
