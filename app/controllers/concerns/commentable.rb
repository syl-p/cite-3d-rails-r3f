module Commentable
  extend ActiveSupport::Concern

  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.user = Current.user
    if @comment.save
      redirect_to @commentable
    else
      # render json: { errors: @medium.errors }, status: :unprocessable_entity
      redirect_to request.referrer, inertia: { errors: @medium.errors }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
