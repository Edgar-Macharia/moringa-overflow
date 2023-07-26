require "application_system_test_case"

class DownvotesTest < ApplicationSystemTestCase
  setup do
    @downvote = downvotes(:one)
  end

  test "visiting the index" do
    visit downvotes_url
    assert_selector "h1", text: "Downvotes"
  end

  test "should create downvote" do
    visit downvotes_url
    click_on "New downvote"

    fill_in "Answer", with: @downvote.answer_id
    fill_in "Downvote count", with: @downvote.downvote_count
    fill_in "Question", with: @downvote.question_id
    fill_in "Users", with: @downvote.users_id
    click_on "Create Downvote"

    assert_text "Downvote was successfully created"
    click_on "Back"
  end

  test "should update Downvote" do
    visit downvote_url(@downvote)
    click_on "Edit this downvote", match: :first

    fill_in "Answer", with: @downvote.answer_id
    fill_in "Downvote count", with: @downvote.downvote_count
    fill_in "Question", with: @downvote.question_id
    fill_in "Users", with: @downvote.users_id
    click_on "Update Downvote"

    assert_text "Downvote was successfully updated"
    click_on "Back"
  end

  test "should destroy Downvote" do
    visit downvote_url(@downvote)
    click_on "Destroy this downvote", match: :first

    assert_text "Downvote was successfully destroyed"
  end
end
