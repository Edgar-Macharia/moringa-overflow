class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :frequency

  has_many :questions
end