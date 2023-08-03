class Question < ApplicationRecord
    belongs_to :user
    has_many :question_tags, dependent: :destroy
    has_many :tags, through: :question_tags
    has_many :answers
    has_many :comments
    after_save :update_tag_frequency
    validates :title, presence: true, uniqueness: true
    validates :body, presence: true
    serialize :tag_names, Array

    before_save :update_tag_names

    private
  
    def update_tag_names
      self.tag_names = tags.map(&:name)
    end

    def update_tag_frequency
      tags.each do |tag|
        tag.increment!(:frequency)
      end
    end
end