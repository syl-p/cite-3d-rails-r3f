class Settings::ProfileController < ApplicationController
  before_action :set_user

  def update
    if @user.update(user_params)

    else
      
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params

  end
end
