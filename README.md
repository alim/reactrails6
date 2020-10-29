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

## Add Nav and Simple Form Component

We will now customize our little app with a navigation bar and some form
elements.

1. Setup a root route in `config/routes.rb`
   ```
   root 'donations#index'
   ```
2. We will put all our customer components in **app/javascript/components**

3. Create a `SampleNavBar.jsx` component to added to the application layout.
   ```
    import React from "react"
    import PropTypes from "prop-types"

    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
      UncontrolledDropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem } from 'reactstrap';

    class SampleNavBar extends React.Component {
      constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render () {
        return (
          <React.Fragment>
              <Navbar color="dark" dark expand="md">
                <NavbarBrand color="white" href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          <NavLink href="/donations/new">Donate</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Navbar>
          </React.Fragment>
        );
      }
    }

    export default SampleNavBar
   ```

4. Add the *SampleNavBar* to the **views/layout/application.html.erb**
   ```
    <body>
      <%= react_component("SampleNavBar") %>
      <div class='container-fluid'>
        <%= yield %>
      </div>
    </body>
   ```

5. Add bootstrap CSS to *app/javascript/packs/application.js* this will cause
   webpacker to compile and include the CSS into a webpack.
   ```
    // Pull in the bootstrap css styles
    import 'bootstrap/dist/css/bootstrap.min.css'
   ```

6. Now let's create a small component for collecting the amout of the
   contribution. Create a file *app/javascript/components/SimpleAmountType.jsx*
   with the contents:
   ```
    import React from 'react'

    class SimpleAmountType extends React.Component {
      render() {
        return(
          <div className="field">
            <label>Amount: </label>
            <input type="text" name="donation[amount]"></input>
          </div>
        );
      }
    }

    export default SimpleAmountType
   ```

7. We will next create a component that does *not* any payment information.
   This component should go in *app/javascript/components/NoPayType.jsx* with
   the following components:
   ```
    import React from 'react'

    class NoPayType extends React.Component {
      render() {
        return(<div></div>);
      }
    }

    export default NoPayType
   ```

8. We create `CharitySelector.jsx` to use the other components that we created
   previously. The comments in the code segment explain the actions that will
   be taken.
   ```
    import React from 'react'
    import NoPayType from './NoPayType'
    import SimpleAmountType from './SimpleAmountType'

    class CharitySelector extends React.Component {
      // Add a contsturctor and bind
      constructor(props) {
        super(props);
        this.onCharitySelected = this.onCharitySelected.bind(this);

        // Initialize the state variable
        this.state = {selectedCharity: "none"};
      }

      onCharitySelected(event) {
        // Event handler to change the state to the selected charity
        // see the select element in the render function below.
        this.setState({selectedCharity: event.target.value});
        console.log(event.target.value);
      }

      render() {
        // Initialize the payment component to the NoPayType so no amount is field
        // is shown to the user.
        let PaymentAmountTypeComponent = NoPayType;

        if (this.state.selectedCharity != "none") {
          // If the state has changed to a type of payment, then we display
          // the SimpleAmountType component.
          PaymentAmountTypeComponent = SimpleAmountType;
        }

        return (
          <div>
            <div className="field">
              <label htmlFor="order_pay_type">Charity</label>​ 
              <select id="charity" onChange={this.onCharitySelected} name="donation[charity]">
                <option value="none">Select your favorite charity</option>​ 
                <option value="habitat">Habitat for Humanity</option>​ 
                <option value="unicef">Unicef</option>​ 
                <option value="cancer_society">American Cancer Society</option>​ 
              </select>​ 
            </div>

            <PaymentAmountTypeComponent />
          </div>
        );
      }
    }
    export default CharitySelector
   ```

9. Update the *app/views/donations/_form.html.erb* by removing the charity
   field and adding the react component.
   ```
    <%= react_component("CharitySelector") %>
   ```

10. Now let's do some cleanup. Since we are loading stylesheets with webpacker
    and not the asset pipeline, we can update the
    *app/views/layout/application.html.erb file.* to remove:
    ```
    <%= stylesheet_link_tag 'application', media: 'all' data-turbolinks-track': 'reload' %>

    and add:

    <%= stylesheet_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
    ```

11. Adding Github Actions

