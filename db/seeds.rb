# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all
Medium.delete_all
Tag.delete_all

std_password = "foobar"
std_user = User.create name: "Jeni Klein", phone: "837-5309", zipcode: 12345, email: "jeni@gmail.com", password: std_password, password_confirmation: std_password
halo = Medium.create kind: "game", title: "Halo 4", author: "Microsoft", secondary_info: "Xbox 360"
shooter = Tag.create name: "shooter"
gta = WishlistItem.create kind: "game", title: "GTA V"

std_user.media << halo
std_user.wishlist_items << gta
halo.tags << shooter
