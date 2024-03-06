class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :event_name
      t.date :event_date_start
      t.date :event_date_end
      t.string :location

      t.timestamps
    end
  end
end
