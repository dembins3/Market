# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141207002825) do

  create_table "media", force: true do |t|
    t.string   "title"
    t.string   "author"
    t.string   "kind"
    t.string   "secondary_info"
    t.integer  "user_id"
    t.datetime "year_created"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "media_tags", id: false, force: true do |t|
    t.integer "tag_id"
    t.integer "medium_id"
  end

  add_index "media_tags", ["tag_id", "medium_id"], name: "index_media_tags_on_tag_id_and_medium_id"

  create_table "password_reset_requests", id: false, force: true do |t|
    t.integer  "user_id"
    t.string   "link"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: true do |t|
    t.string "name"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "phone"
    t.integer  "zipcode"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
  end

  create_table "wishlist_items", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.string   "kind"
    t.integer  "user_id"
  end

end
