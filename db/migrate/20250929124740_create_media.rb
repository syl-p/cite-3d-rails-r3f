class CreateMedia < ActiveRecord::Migration[8.0]
  def change
    create_table :media do |t|
      t.references :part, foreign_key: true
      t.belongs_to :user
      t.string :title
      t.timestamps
    end
  end
end
