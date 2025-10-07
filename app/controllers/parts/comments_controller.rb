class Parts::CommentsController < ApplicationController
  before_action :set_commentable
  include Commentable

  private

  def set_commentable
    @commentable = Part.find(params[:id])
  end
end
