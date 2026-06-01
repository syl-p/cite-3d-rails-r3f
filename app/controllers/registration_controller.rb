class RegistrationController < ApplicationController
  allow_unauthenticated_access only: %i[create]

  def create
    @user = User.new(user_params)
    if @user.save
      start_new_session_for @user
      flash[:success] = "Votre compte à bien été créé."
      redirect_to after_authentication_url
    else
      flash[:error] = "Adresse email ou mot de passe incorrect."
      render inertia: "registration/New",
         props: { errors: @user.errors },
         status: :unprocessable_entity

    end
  end

  private

  def user_params
    params.require(:registration).permit(:password, :password_confirmation, :username, :email_address)
  end
end
