class UpdateUniqueIndexOnChallenges < ActiveRecord::Migration[7.1]
  def change
    remove_index :challenges, name: :index_challenges_on_event_challenger_challengee_unique
    add_index :challenges, [:event_id, :challenger_id, :challengee_id, :division], unique: true, name: 'index_challenges_on_event_challenger_challengee_division_unique'
  end
end
