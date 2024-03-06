class CreateEventPlacements < ActiveRecord::Migration[7.1]
  def change
    create_table :event_placements do |t|
      t.references :event, null: false, foreign_key: true
      t.references :player, null: false, foreign_key: true
      t.integer :placement
      t.string :division
      t.timestamps
    end
    add_index :event_placements, [:event_id, :placement], unique: true
  end
end
