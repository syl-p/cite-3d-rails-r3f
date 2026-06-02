class Part < ApplicationRecord
  has_many :media, class_name: "Medium"
  has_many :comments, as: :commentable
  composed_of :offset, class_name: "Point", mapping: { offset_x: :x, offset_y: :y, offset_z: :z }

  validates :offset, presence: :true
  validates :object_name, presence: true
  validates :description, presence: true
  validates :body, presence: true
  validates :title, presence: true
end
