class ApplicationController < ActionController::Base
  include Authentication
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  inertia_share do
    {
      parts:,
      current_user: authenticated? ? Current.user : nil
    }
  end

  def parts
    Part.all
  end
end
