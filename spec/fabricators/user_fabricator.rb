Fabricator(:user) do
	name {sequence(:name) {|i| "User #{i}"}}
	email {sequence(:email) {|i| "tester_#{i}@epfl.ch"}}
	password "topsecret"
	password_confirmation "topsecret"
	role :student
	confirmed_at 2.days.ago
end