class AddUniqueIndexToChallenges < ActiveRecord::Migration[7.1]
  def change
    add_index :challenges, [:event_id, :challenger_id, :challengee_id], unique: true, name: 'index_challenges_on_event_challenger_challengee_unique'
  end
end
