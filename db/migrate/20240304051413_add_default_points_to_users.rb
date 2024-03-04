class AddDefaultPointsToUsers < ActiveRecord::Migration[7.1]
  def up
    change_column_default :users, :points, 0
    User.where(points: nil).update_all(points: 0)
  end

  def down
  end
end
