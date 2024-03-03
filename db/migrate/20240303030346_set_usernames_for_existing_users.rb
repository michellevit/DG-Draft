class SetUsernamesForExistingUsers < ActiveRecord::Migration[7.1]
  def up
    User.all.each do |user|
      user.update(username: generate_username) if user.username.blank?
    end
  end

  private

  def generate_username
    loop do
      username = "some-one-#{rand(0..99990)}"
      return username unless User.exists?(username: username)
    end
  end
end