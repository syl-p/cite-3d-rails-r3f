class CreateParts < ActiveRecord::Migration[8.0]
  def change
    create_table :parts do |t|
      t.string :title, null: false
      t.text :description
      t.text :body, null: false
      t.string :object_name # theatre
      t.float :offset_x, default: 0
      t.float :offset_y, default: 0
      t.float :offset_z, default: 0
      t.timestamps
    end
  end
end
