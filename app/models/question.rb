class Question < ApplicationRecord
    belongs_to :user
    has_many :question_tags, dependent: :destroy
    has_many :tags, through: :question_tags
    has_many :answers, dependent: :destroy
    has_many :favorites, dependent: :destroy
    has_many :favorited_by_users, through: :favorites, source: :user
    has_many :upvotes, dependent: :destroy
    has_many :downvotes, dependent: :destroy

    after_save :update_tag_frequency
    validates :title, presence: true, uniqueness: true
    validates :body, presence: true

    private

    def update_tag_frequency
      tags.each do |tag|
        tag.increment!(:frequency)
      end
    end

    def author_username
      user.username
    end
end