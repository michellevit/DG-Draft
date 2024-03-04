class AddMaxLengthToUsername < ActiveRecord::Migration[7.1]
  def change
    change_column :users, :username, :string, limit: 25
  end
end
