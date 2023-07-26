require "application_system_test_case"

class UpvotesTest < ApplicationSystemTestCase
  setup do
    @upvote = upvotes(:one)
  end

  test "visiting the index" do
    visit upvotes_url
    assert_selector "h1", text: "Upvotes"
  end

  test "should create upvote" do
    visit upvotes_url
    click_on "New upvote"

    fill_in "Answer", with: @upvote.answer_id
    fill_in "Question", with: @upvote.question_id
    fill_in "Upvote count", with: @upvote.upvote_count
    fill_in "Users", with: @upvote.users_id
    click_on "Create Upvote"

    assert_text "Upvote was successfully created"
    click_on "Back"
  end

  test "should update Upvote" do
    visit upvote_url(@upvote)
    click_on "Edit this upvote", match: :first

    fill_in "Answer", with: @upvote.answer_id
    fill_in "Question", with: @upvote.question_id
    fill_in "Upvote count", with: @upvote.upvote_count
    fill_in "Users", with: @upvote.users_id
    click_on "Update Upvote"

    assert_text "Upvote was successfully updated"
    click_on "Back"
  end

  test "should destroy Upvote" do
    visit upvote_url(@upvote)
    click_on "Destroy this upvote", match: :first

    assert_text "Upvote was successfully destroyed"
  end
end
