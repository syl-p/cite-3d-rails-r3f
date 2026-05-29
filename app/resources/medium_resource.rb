class MediumResource
  include Alba::Resource

  attributes :id
  one :user, resource: UserResource

  attribute :file_url do |medium|
    if medium.file.attached?
      Rails.application.routes.url_helpers.rails_blob_path(
        medium.file,
        only_path: true
      )
    end
  end
end
