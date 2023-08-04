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

ActiveRecord::Schema[7.0].define(version: 2023_08_04_053509) do
  create_table "answers", force: :cascade do |t|
    t.text "body"
    t.integer "user_id", null: false
    t.integer "question_id", null: false
    t.integer "upvotes"
    t.integer "downvotes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.integer "user_id", null: false
    t.integer "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_comments_on_question_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "downvotes", force: :cascade do |t|
    t.integer "question_id", null: false
    t.integer "user_id", null: false
    t.integer "answer_id", null: false
    t.integer "downvote_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["answer_id"], name: "index_downvotes_on_answer_id"
    t.index ["question_id"], name: "index_downvotes_on_question_id"
    t.index ["user_id"], name: "index_downvotes_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "message"
    t.integer "user_id"
    t.boolean "is_read", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "question_tags", force: :cascade do |t|
    t.integer "question_id", null: false
    t.integer "tag_id", null: false
    t.index ["question_id"], name: "index_question_tags_on_question_id"
    t.index ["tag_id"], name: "index_question_tags_on_tag_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tag_names", default: ""
    t.integer "upvotes_count", default: 0
    t.integer "downvotes_count", default: 0
    t.index ["downvotes_count"], name: "index_questions_on_downvotes_count"
    t.index ["upvotes_count"], name: "index_questions_on_upvotes_count"
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "reported_contents", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "content_type"
    t.integer "question_id", null: false
    t.string "reason"
    t.boolean "is_handled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_reported_contents_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.integer "frequency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "upvotes", force: :cascade do |t|
    t.integer "question_id", null: false
    t.integer "user_id", null: false
    t.integer "answer_id", null: false
    t.integer "upvote_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["answer_id"], name: "index_upvotes_on_answer_id"
    t.index ["question_id"], name: "index_upvotes_on_question_id"
    t.index ["user_id"], name: "index_upvotes_on_user_id"
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
  add_foreign_key "downvotes", "users"
  add_foreign_key "question_tags", "questions"
  add_foreign_key "question_tags", "tags"
  add_foreign_key "questions", "users"
  add_foreign_key "reported_contents", "questions"
  add_foreign_key "reported_contents", "users"
  add_foreign_key "upvotes", "answers"
  add_foreign_key "upvotes", "questions"
  add_foreign_key "upvotes", "users"
end
