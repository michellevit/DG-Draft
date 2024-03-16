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

ActiveRecord::Schema[7.1].define(version: 2024_03_16_190848) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenges", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "challenger_id", null: false
    t.bigint "challengee_id", null: false
    t.string "start_condition"
    t.string "status", default: "Pending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "division"
    t.index ["challengee_id"], name: "index_challenges_on_challengee_id"
    t.index ["challenger_id"], name: "index_challenges_on_challenger_id"
    t.index ["event_id", "challenger_id", "challengee_id"], name: "index_challenges_on_event_challenger_challengee_unique", unique: true
    t.index ["event_id"], name: "index_challenges_on_event_id"
  end

  create_table "event_placements", force: :cascade do |t|
    t.bigint "event_id", null: false
    t.bigint "player_id", null: false
    t.integer "placement"
    t.string "division"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id", "placement"], name: "index_event_placements_on_event_id_and_placement", unique: true
    t.index ["event_id"], name: "index_event_placements_on_event_id"
    t.index ["player_id"], name: "index_event_placements_on_player_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "event_name"
    t.date "event_date_start"
    t.date "event_date_end"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.integer "pdga_number"
    t.string "division"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["division"], name: "index_players_on_division"
    t.index ["pdga_number"], name: "index_players_on_pdga_number", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", limit: 25
    t.integer "points", default: 0
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "challenges", "events"
  add_foreign_key "challenges", "users", column: "challengee_id"
  add_foreign_key "challenges", "users", column: "challenger_id"
  add_foreign_key "event_placements", "events"
  add_foreign_key "event_placements", "players"
end
