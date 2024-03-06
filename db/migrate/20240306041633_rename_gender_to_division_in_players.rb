class RenameGenderToDivisionInPlayers < ActiveRecord::Migration[7.1]
  def change
    rename_column :players, :gender, :division
  end
end