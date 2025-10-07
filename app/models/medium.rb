class Medium < ApplicationRecord
  belongs_to :user
  belongs_to :part
  has_one_attached :file

  validates :file, presence: true
  validate :check_file_extension
  validate :check_file_size

  include Rails.application.routes.url_helpers

  def as_json(options = {})
    super(only: [ :id, :title, :created_at ]).merge(
      file_url: file.attached? ? "/rails/active_storage/blobs/#{file.signed_id}/#{file.filename}" : nil
    )
  end

  def check_file_extension
    return unless file.attached?

    unless file.content_type.in?(%w[image/jpeg image/jpg image/png image/gif video/mp4 audio/mpeg audio/wav application/pdf])
      errors.add :file, "Must be a valid file extension"
    end
  end

  def check_file_size
    return unless file.attached?

    unless file.blob.byte_size <= 5.megabytes
      errors.add :file, "Must be less than 5 megabytes"
    end
  end
end
