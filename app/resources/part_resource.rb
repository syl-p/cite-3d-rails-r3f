class PartResource
  include Alba::Resource

  attributes :id, :title, :description, :body, :offset_x, :offset_y, :offset_z, :object_name, :created_at, :updated_at

  many :media, resource: MediumResource
  many :comments, resource: CommentResource
end
