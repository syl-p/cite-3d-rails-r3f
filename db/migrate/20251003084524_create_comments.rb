class CreateComments < ActiveRecord::Migration[8.0]
  def change
    create_table :comments do |t|
      t.timestamps
      t.belongs_to :user
      t.belongs_to :commentable, polymorphic: true
      t.text :content
    end
  end
end
