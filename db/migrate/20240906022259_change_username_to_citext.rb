class ChangeUsernameToCitext < ActiveRecord::Migration[7.1]
  def up
    enable_extension 'citext'
    change_column :users, :username, :citext
    remove_index :users, :username if index_exists?(:users, :username)
    add_index :users, :username, unique: true
  end

  def down
    remove_index :users, :username if index_exists?(:users, :username)
    change_column :users, :username, :string
    add_index :users, :username, unique: true
  end
end