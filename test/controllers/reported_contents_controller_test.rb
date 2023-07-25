require "test_helper"

class ReportedContentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @reported_content = reported_contents(:one)
  end

  test "should get index" do
    get reported_contents_url
    assert_response :success
  end

  test "should get new" do
    get new_reported_content_url
    assert_response :success
  end

  test "should create reported_content" do
    assert_difference("ReportedContent.count") do
      post reported_contents_url, params: { reported_content: { content_id: @reported_content.content_id, content_type: @reported_content.content_type, is_handled: @reported_content.is_handled, reason: @reported_content.reason, user_id: @reported_content.user_id } }
    end

    assert_redirected_to reported_content_url(ReportedContent.last)
  end

  test "should show reported_content" do
    get reported_content_url(@reported_content)
    assert_response :success
  end

  test "should get edit" do
    get edit_reported_content_url(@reported_content)
    assert_response :success
  end

  test "should update reported_content" do
    patch reported_content_url(@reported_content), params: { reported_content: { content_id: @reported_content.content_id, content_type: @reported_content.content_type, is_handled: @reported_content.is_handled, reason: @reported_content.reason, user_id: @reported_content.user_id } }
    assert_redirected_to reported_content_url(@reported_content)
  end

  test "should destroy reported_content" do
    assert_difference("ReportedContent.count", -1) do
      delete reported_content_url(@reported_content)
    end

    assert_redirected_to reported_contents_url
  end
end
