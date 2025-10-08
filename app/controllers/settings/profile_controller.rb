class Settings::ProfileController < ApplicationController
  def update

  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
