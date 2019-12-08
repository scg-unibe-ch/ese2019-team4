#ESE Project 2019 Team 4

##Running our app
To run our app, cd into the backend folder and run: 'node build/server.js'
Let the server run in the background and use another terminal to cd in to the frontend  folder
and run: 'ng serve'
Then open your Browser on the designated localhost.

##Our features

####Registration
We offer a feature where you can register yourself to our service.
To register, hit the menu on the top left corner and choose Register.
You can choose any username that's not yet used and any password. You have
to confirm your password by typing it again.
If a user with the same name already exists, or your passwords don't match
you won't be able to register.
By checking the box below you can register as a provider in order
to be able to provide services later.

####Login
If you already have an account you can hit the login button on the top
right corner, enter your username and password and log in.

####Profile Page
Registered users can access there profile page, where they see some
information to their account.
A customer sees his name as well as the typ of his account which is customer.
There is a logout button below as well

A provider gets the same information plus a list of all the services
he has offered.

####Posting a service
A logged in provider can post a new service by hitting the menu button
and choose 'Share your Service'.
The provider can add a title, as well as a description to his service.
In addition he can choose one of the pictures.
Below there is a live preview of the post so the provider can
get an idea what his post is going to look like.
By pressing the 'Post Service' button the Post will be added
to our list of posts. A post cannot be submitted with an empty
title or description.

####Home - List of services
On our Home page all the offered services are listed just waiting to be booked
by one of our customers. You can search through the list with the
search window at the top on the right. To see all the available
services again after you've searched something just hit the refresh button.
The search is case sensitive!

####Post Detail Page
By clicking on one of the posts you can get more information about it!

####Subscriptions
Coming soon!!

####About us
Visit our About us Page for more information about our team and the
app.

####Dark Mode
Our whole app can be used in darkmode. You can find a switch in
the menu where you're able to switch between normal and dark mode

##Testing

####Unit Testing
We have implemented Karma Unit Tests to make sure things are
working as expected
