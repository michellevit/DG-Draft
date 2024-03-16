class ChangeDefaultStatusInChallenges < ActiveRecord::Migration[7.1]
  def up
    change_column_default :challenges, :status, from: "pending", to: "Pending"
  end
end
