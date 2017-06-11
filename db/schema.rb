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

ActiveRecord::Schema.define(version: 20170606025710) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.integer  "menu_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["menu_id"], name: "index_categories_on_menu_id", using: :btree
  end

  create_table "items", force: :cascade do |t|
    t.string   "alias_name"
    t.string   "full_name"
    t.json     "ingredients"
    t.decimal  "regular_price",      precision: 10, scale: 2
    t.boolean  "on_sale"
    t.boolean  "featured"
    t.boolean  "recommended"
    t.integer  "restaurant_ratings"
    t.json     "historial_pricing"
    t.boolean  "active"
    t.decimal  "sales_price",        precision: 10, scale: 2
    t.datetime "created_at",                                               null: false
    t.datetime "updated_at",                                               null: false
    t.text     "tags",                                        default: [],              array: true
    t.integer  "prep_time"
    t.string   "inactive_reason"
    t.integer  "category_id"
    t.integer  "menu_id"
    t.index ["category_id"], name: "index_items_on_category_id", using: :btree
    t.index ["menu_id"], name: "index_items_on_menu_id", using: :btree
  end

  create_table "menus", force: :cascade do |t|
    t.string   "name"
    t.integer  "available_time"
    t.boolean  "active"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "restaurant_id"
    t.index ["restaurant_id"], name: "index_menus_on_restaurant_id", using: :btree
  end

  create_table "orders", force: :cascade do |t|
    t.string   "order_number"
    t.string   "notes"
    t.json     "items"
    t.string   "table_number"
    t.string   "status",        default: "ordered"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.integer  "restaurant_id"
    t.index ["restaurant_id"], name: "index_orders_on_restaurant_id", using: :btree
  end

  create_table "photos", force: :cascade do |t|
    t.string   "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "qr_codes", force: :cascade do |t|
    t.boolean  "expired",       default: false
    t.string   "qrcode",        default: ""
    t.string   "table_number"
    t.string   "description"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.integer  "restaurant_id"
    t.index ["restaurant_id"], name: "index_qr_codes_on_restaurant_id", using: :btree
  end

  create_table "restaurant_employees", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "nickname"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "group"
    t.boolean  "admin",                  default: false
    t.boolean  "staff",                  default: true
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "restaurant_id"
    t.boolean  "is_employer",            default: false
    t.index ["email"], name: "index_restaurant_employees_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_restaurant_employees_on_reset_password_token", unique: true, using: :btree
    t.index ["restaurant_id"], name: "index_restaurant_employees_on_restaurant_id", using: :btree
  end

  create_table "restaurants", force: :cascade do |t|
    t.string   "business_name"
    t.string   "business_alias"
    t.string   "owner_user_id"
    t.string   "business_phone_number"
    t.string   "contact_email"
    t.string   "registered_email"
    t.string   "tax_id"
    t.string   "street_name"
    t.string   "city"
    t.string   "state"
    t.string   "zip_code"
    t.json     "cuisine_type"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "slug"
  end

  add_foreign_key "items", "categories"
  add_foreign_key "items", "menus"
  add_foreign_key "menus", "restaurants"
  add_foreign_key "restaurant_employees", "restaurants"
end
