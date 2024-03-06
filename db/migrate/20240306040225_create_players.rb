class CreatePlayers < ActiveRecord::Migration[7.1]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :pdga_number
      t.string :gender
      t.timestamps
    end
    add_index :players, :pdga_number, unique: true
    add_index :players, :gender
  end
end