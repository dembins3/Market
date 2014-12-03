class Medium < ActiveRecord::Base
  has_and_belongs_to_many :tags
  belongs_to :user

  validates :kind, inclusion: { in: %w(game book movie music) }
  validates :title, presence: true

  default_scope {
    order(created_at: :desc)
  }

  scope :withKind, ->(kind) {
    where kind: kind 
  }

  scope :withTitleMatching, ->(title) {
    likeTitle = "%#{title}%"
    where ["title like :title", {title: likeTitle}]
  }

  scope :authoredBy, ->(author) {
    likeAuthor = "%#{author}%"
    where ["author like :author", {title: likeAuthor}]
  }

  scope :createdBefore, ->(date) {
    where ["year_created < ?", date]
  }

  scope :createdAfter, ->(date) {
    where ["? < year_created", date]
  }

  scope :uploadedRecently, -> {
    where ["? < created_at", 2.days.ago]
  }
end
