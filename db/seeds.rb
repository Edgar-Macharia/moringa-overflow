# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.destroy_all
Question.destroy_all
Tag.destroy_all
Answer.destroy_all
Comment.destroy_all

# Create admin user
admin_user = User.create!(
  username: "admin_user",
  email: "admin@example.com",
  password: "password", # Replace with secure password
  is_admin: true
)

# Create moderator user
moderator_user = User.create!(
  username: "moderator_user",
  email: "moderator@example.com",
  password: "password", # Replace with secure password
  is_moderator: true
)

# Create regular users
10.times do
  User.create!(
    username: Faker::Internet.unique.username(specifier: 5..15),
    email: Faker::Internet.unique.email,
    password: "password", # Replace with secure password
  )
end

# Assign both admin and moderator roles to a user
both_roles_user = User.create!(
  username: "both_roles_user",
  email: "both@example.com",
  password: "password", # Replace with secure password
  is_admin: true,
  is_moderator: true
)

puts "Seed data for users created successfully!"

# Seed data for tags
tags = ["ruby", "rails", "javascript", "react", "python", "java", "sql", "html", "css"]
tags.each do |tag_name|
  Tag.create!(
    name: tag_name,
    vote_type: [true, false].sample,
    frequency: rand(10..100)
  )
end

# Seed data for questions
users = User.all
tags = Tag.all

30.times do
  question = Question.create!(
    title: Faker::Lorem.sentence(word_count: 6),
    body: Faker::Lorem.paragraph(sentence_count: 3),
    user: users.sample,
    tag: tags.sample
  )

  # Seed data for answers
  rand(0..5).times do
    Answer.create!(
      body: Faker::Lorem.paragraph(sentence_count: 2),
      user: users.sample,
      question: question,
      upvotes: rand(0..10),
      downvotes: rand(0..10)
    )
  end

  # Seed data for comments
  rand(0..3).times do
    Comment.create!(
      body: Faker::Lorem.sentence(word_count: 10),
      user: users.sample,
      question: question
    )
  end
end

puts "Seed data for questions, tags, answers, and comments created successfully!"
