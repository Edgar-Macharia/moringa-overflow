require "application_system_test_case"

class ReportedContentsTest < ApplicationSystemTestCase
  setup do
    @reported_content = reported_contents(:one)
  end

  test "visiting the index" do
    visit reported_contents_url
    assert_selector "h1", text: "Reported contents"
  end

  test "should create reported content" do
    visit reported_contents_url
    click_on "New reported content"

    fill_in "Content", with: @reported_content.content_id
    fill_in "Content type", with: @reported_content.content_type
    check "Is handled" if @reported_content.is_handled
    fill_in "Reason", with: @reported_content.reason
    fill_in "User", with: @reported_content.user_id
    click_on "Create Reported content"

    assert_text "Reported content was successfully created"
    click_on "Back"
  end

  test "should update Reported content" do
    visit reported_content_url(@reported_content)
    click_on "Edit this reported content", match: :first

    fill_in "Content", with: @reported_content.content_id
    fill_in "Content type", with: @reported_content.content_type
    check "Is handled" if @reported_content.is_handled
    fill_in "Reason", with: @reported_content.reason
    fill_in "User", with: @reported_content.user_id
    click_on "Update Reported content"

    assert_text "Reported content was successfully updated"
    click_on "Back"
  end

  test "should destroy Reported content" do
    visit reported_content_url(@reported_content)
    click_on "Destroy this reported content", match: :first

    assert_text "Reported content was successfully destroyed"
  end
end
