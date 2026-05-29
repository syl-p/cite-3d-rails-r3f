class CommentResource
  include Alba::Resource

  root_key :comment, :comments

  attributes :id, :content, :created_at, :updated_at
  one :user, resource: UserResource
end