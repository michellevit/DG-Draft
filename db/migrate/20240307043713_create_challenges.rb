class CreateChallenges < ActiveRecord::Migration[7.1]
  def change
    create_table :challenges do |t|
      t.references :event, null: false, foreign_key: true
      t.references :challenger, null: false, foreign_key: { to_table: 'users' }
      t.references :challengee, null: false, foreign_key: { to_table: 'users' }
      t.string :start_condition
      t.string :status, default: 'pending'
      t.timestamps
    end
  end
end