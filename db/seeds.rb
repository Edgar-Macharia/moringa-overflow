User.destroy_all
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

users = User.all
Question.destroy_all

questions_data = [
  {
    title: "How to set up a Ruby on Rails project?",
    body: "I'm new to Ruby on Rails and I want to know the steps to set up a new project. Can someone guide me?",
    user: users.sample,
    upvotes_count: rand(0..100),
    downvotes_count: rand(0..100),
    tag_names: ["ruby", "rails"]
  },
  {
    title: "Best practices for React component architecture?",
    body: "I'm building a complex React application and I want to follow best practices for organizing my components. Any tips?",
    user: users.sample,
    upvotes_count: rand(0..100),
    downvotes_count: rand(0..100),
    tag_names: ["react", "JSX"]
},
  {
    title: "How to handle database migrations in Django?",
    body: "I'm working on a Django project and I'm not sure how to handle database migrations. What's the recommended approach?",
      user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["Gemfile", "Github"]
  },
  {
    title: "Troubleshooting SQL query performance",
    body: "I have a slow-performing SQL query and I'm not sure how to optimize it. Are there any tools or techniques I can use to troubleshoot?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["Git", "Gitignore"]
  },
  {
    title: "Getting started with Python for data analysis",
    body: "I'm interested in using Python for data analysis tasks. What are the essential libraries and resources I should start with?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["Newbie", "rails"]
  },
  {
    title: "How to deploy a Ruby on Rails app to Heroku?",
    body: "I've developed a Ruby on Rails application and I want to deploy it to Heroku. Can someone walk me through the process?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["Framework", "Laravel"]
  },
  {
    title: "Is it possible to use async/await with JavaScript's Fetch API?",
    body: "I've been using JavaScript's Fetch API for making API requests, but I'm wondering if it's possible to use async/await with it. Any examples?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["coding", "Javascript"]
  },
  {
    title: "Optimizing Java application performance",
    body: "I have a Java application that's running slowly. What are some strategies I can use to optimize its performance?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["ruby", "Chrome"]
  },
  {
    title: "Creating responsive web designs with CSS Grid",
    body: "I want to create a responsive web design using CSS Grid. Are there any tutorials or resources that can help me get started?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["firefox", "rails"]
  },
  {
    title: "How to handle user authentication in Flask?",
    body: "I'm building a web application with Flask and I need to implement user authentication. What's the recommended approach?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["ruby", "rails"]
  },
  {
    title: "Tips for writing clean and maintainable code in C#",
    body: "I'm working on a C# project and I want to ensure that my code is clean and maintainable. Any best practices or tips?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["ruby", "rails"]
  },
  {
    title: "Getting started with version control using Git",
    body: "I'm new to version control and Git. Can someone provide a beginner-friendly guide on how to get started?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["Jobs", "rails"]
  },
  {
    title: "Debugging techniques in Python",
    body: "I'm encountering bugs in my Python code and I'm not sure how to debug them. What are some effective debugging techniques?",
           user: users.sample,
      upvotes_count: rand(0..100),
      downvotes_count: rand(0..100),
      tag_names: ["Wanted", "rails"]
  }
]

questions_data.each do |question_data|
  tags = question_data[:tag_names]
  question = Question.create!(question_data)
  question.tags = tags.map { |tag_name| Tag.find_or_create_by(name: tag_name) }
end

puts "Seed data for questions created successfully!"

Answer.destroy_all

# Seed data for answers
users = User.all
questions = Question.all

answers_data = [
  {
    body: "To set up a new Ruby on Rails project, you can use the `rails new` command. Make sure you have Ruby and Rails installed, then run:",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "For React component architecture, it's recommended to follow a modular structure using components. Consider using a container/presentational pattern and separating concerns.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "In Django, you can manage database migrations using the `makemigrations` and `migrate` commands. They allow you to define and apply changes to your database schema.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "To troubleshoot SQL query performance, you can use tools like EXPLAIN and ANALYZE to analyze query plans. Additionally, consider indexing and optimizing your queries.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "For Python data analysis, start with libraries like Pandas, NumPy, and Matplotlib. You can use Jupyter notebooks for interactive analysis and visualization.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "To deploy a Ruby on Rails app to Heroku, you can follow these steps:\n1. Install the Heroku CLI.\n2. Create a Heroku app using `heroku create`.\n3. Push your code to Heroku's remote repository.\n4. Run migrations on the Heroku database using `heroku run rake db:migrate`.\n5. Open your app in the browser using `heroku open`.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "Yes, you can use async/await with JavaScript's Fetch API. Here's an example:\n\n```javascript\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error fetching data:', error);\n  }\n}\n```",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "When optimizing Java application performance, consider:\n1. Profiling your code to identify bottlenecks.\n2. Using efficient data structures and algorithms.\n3. Minimizing object creation and garbage collection.\n4. Utilizing multithreading and concurrency.\n5. Caching frequently used data.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "To create a responsive web design using CSS Grid, you can:\n1. Define a grid container using `display: grid`.\n2. Place grid items using `grid-template-rows` and `grid-template-columns`.\n3. Use media queries to adjust the grid layout based on screen size.\n4. Utilize the `grid-gap` property for spacing.\n5. Experiment with `grid-template-areas` for complex layouts.",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  },
  {
    body: "For user authentication in Flask, you can use libraries like Flask-Login or Flask-Security. Here's an example using Flask-Login:\n\n```python\nfrom flask import Flask, request\nfrom flask_login import LoginManager, UserMixin, login_user\n\napp = Flask(__name__)\nlogin_manager = LoginManager(app)\n\nclass User(UserMixin):\n    def __init__(self, user_id):\n        self.id = user_id\n\n@login_manager.user_loader\ndef load_user(user_id):\n    return User(user_id)\n\n@app.route('/login', methods=['POST'])\ndef login():\n    user_id = request.form.get('user_id')\n    user = User(user_id)\n    login_user(user)\n    return 'Logged in'\n\nif __name__ == '__main__':\n    app.run()\n```",
    user: users.sample,
    question: questions.sample,
    upvotes: rand(0..10),
    downvotes: rand(0..5)
  }
  
]

answers_data.each do |answer_data|
  Answer.create!(answer_data)
end

puts "Seed data for answers created successfully!"
 