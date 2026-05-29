class UserResource
  include Alba::Resource

  attributes :id, :username, :email_address, :created_at, :updated_at

  def avatar_path
    "/images/avatars/#{object.username}.png"
  end
end