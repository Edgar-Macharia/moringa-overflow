# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_26_085124) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "timescaledb"

  create_table "answers", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id", null: false
    t.bigint "question_id", null: false
    t.integer "upvotes"
    t.integer "downvotes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id", null: false
    t.bigint "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_comments_on_question_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "downvotes", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "users_id", null: false
    t.bigint "answer_id", null: false
    t.integer "downvote_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["answer_id"], name: "index_downvotes_on_answer_id"
    t.index ["question_id"], name: "index_downvotes_on_question_id"
    t.index ["users_id"], name: "index_downvotes_on_users_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "notification_type"
    t.boolean "is_read"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "user_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id"], name: "index_questions_on_tag_id"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "reported_contents", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "content_type"
    t.integer "question", null: false
    t.string "reason"
    t.boolean "is_handled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_reported_contents_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.boolean "vote_type"
    t.integer "frequency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "upvotes", force: :cascade do |t|
    t.bigint "question_id", null: false
    t.bigint "users_id", null: false
    t.bigint "answer_id", null: false
    t.integer "upvote_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["answer_id"], name: "index_upvotes_on_answer_id"
    t.index ["question_id"], name: "index_upvotes_on_question_id"
    t.index ["users_id"], name: "index_upvotes_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.integer "social_media_id"
    t.string "profile_picture"
    t.string "social_media_provider"
    t.boolean "is_admin", default: false
    t.boolean "is_moderator", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "users"
  add_foreign_key "comments", "questions"
  add_foreign_key "comments", "users"
  add_foreign_key "downvotes", "answers"
  add_foreign_key "downvotes", "questions"
  add_foreign_key "downvotes", "users", column: "users_id"
  add_foreign_key "notifications", "users"
  add_foreign_key "questions", "tags"
  add_foreign_key "questions", "users"
  add_foreign_key "reported_contents", "users"
  add_foreign_key "upvotes", "answers"
  add_foreign_key "upvotes", "questions"
  add_foreign_key "upvotes", "users", column: "users_id"
end
