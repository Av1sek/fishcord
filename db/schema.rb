# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_01_180609) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.bigint "server_id"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "dchannels", force: :cascade do |t|
    t.bigint "user_1_id"
    t.bigint "user_2_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_1_id"], name: "index_dchannels_on_user_1_id"
    t.index ["user_2_id"], name: "index_dchannels_on_user_2_id"
  end

  create_table "dmessages", force: :cascade do |t|
    t.bigint "author_id"
    t.bigint "chatroom_id"
    t.text "content", null: false
    t.string "author_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_dmessages_on_author_id"
    t.index ["chatroom_id"], name: "index_dmessages_on_chatroom_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "author_id"
    t.bigint "chatroom_id"
    t.text "content", null: false
    t.string "author_name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["chatroom_id"], name: "index_messages_on_chatroom_id"
  end

  create_table "server_members", force: :cascade do |t|
    t.bigint "member_id"
    t.bigint "server_id"
    t.index ["member_id"], name: "index_server_members_on_member_id"
    t.index ["server_id"], name: "index_server_members_on_server_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_servers_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "tag", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "bio"
    t.string "text_status", null: false
    t.string "online_status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "channels", "servers"
  add_foreign_key "dchannels", "users", column: "user_1_id"
  add_foreign_key "dchannels", "users", column: "user_2_id"
  add_foreign_key "dmessages", "dchannels", column: "chatroom_id"
  add_foreign_key "dmessages", "users", column: "author_id"
  add_foreign_key "messages", "channels", column: "chatroom_id"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "server_members", "servers"
  add_foreign_key "server_members", "users", column: "member_id"
  add_foreign_key "servers", "users", column: "owner_id"
end
