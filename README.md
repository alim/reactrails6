# React Rails Sample Program

## Initial Setup

1. `rails new reactrails6 --webpack=react --skip-coffee --skip-sprockets`
2. `cd reactrails6`
3. `bundle add react-rails`
4. `yarn add react_ujs reactstrap bootstrap`
7. `yarn check`
8. `bin/rails generate react:install`
9. Edit the `config/initializers/content_security_policy.rb` file and uncomment the line that starts with `policy.connect_src`

## Donations Setup

Our little sample program will setup a simple form and resource for accepting
charity donations.

1. `bin/rails g scaffold Donations charity:string amount:float`
2. Run `webpacker-dev-server` in a separate terminal session.
3. `bin/rails db:migrate`
