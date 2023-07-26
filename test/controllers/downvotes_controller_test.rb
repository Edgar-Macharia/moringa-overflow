require "test_helper"

class DownvotesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @downvote = downvotes(:one)
  end

  test "should get index" do
    get downvotes_url
    assert_response :success
  end

  test "should get new" do
    get new_downvote_url
    assert_response :success
  end

  test "should create downvote" do
    assert_difference("Downvote.count") do
      post downvotes_url, params: { downvote: { answer_id: @downvote.answer_id, downvote_count: @downvote.downvote_count, question_id: @downvote.question_id, users_id: @downvote.users_id } }
    end

    assert_redirected_to downvote_url(Downvote.last)
  end

  test "should show downvote" do
    get downvote_url(@downvote)
    assert_response :success
  end

  test "should get edit" do
    get edit_downvote_url(@downvote)
    assert_response :success
  end

  test "should update downvote" do
    patch downvote_url(@downvote), params: { downvote: { answer_id: @downvote.answer_id, downvote_count: @downvote.downvote_count, question_id: @downvote.question_id, users_id: @downvote.users_id } }
    assert_redirected_to downvote_url(@downvote)
  end

  test "should destroy downvote" do
    assert_difference("Downvote.count", -1) do
      delete downvote_url(@downvote)
    end

    assert_redirected_to downvotes_url
  end
end
