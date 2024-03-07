class AddDivisionToChallenges < ActiveRecord::Migration[7.1]
  def change
    add_column :challenges, :division, :string
  end
end
