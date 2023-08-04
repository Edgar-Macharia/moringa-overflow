class Question < ApplicationRecord
    belongs_to :user
    has_many :question_tags, dependent: :destroy
    has_many :tags, through: :question_tags
    has_many :answers, dependent: :destroy
    has_many :comments
    after_save :update_tag_frequency
    validates :title, presence: true, uniqueness: true
    validates :body, presence: true

    has_many :upvotes
    has_many :downvotes
    has_many :upvotes, counter_cache: :upvotes_count
    has_many :downvotes, counter_cache: :downvotes_count
    
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