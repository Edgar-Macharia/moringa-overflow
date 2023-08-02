class Question < ApplicationRecord
    belongs_to :user
    has_many :question_tags, class_name: 'QuestionTag', dependent: :destroy
    has_many :tags, through: :question_tags
    has_many :answers
    has_many :comments
    after_save :update_tag_frequency

    private

    def update_tag_frequency
      tags.each do |tag|
        tag.increment!(:frequency)
      end
    end
end