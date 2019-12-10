<h1>ESE Project 2019 Team 4</h1>

<h2>Running our app for the (First time)</h2>
To run our app you first need to install it, there are 2 ways of doing that.<br>
The easy way:<br>
We shared our configuration through VCS so you can simply use that configuration. 
For that you need to open webstorm and run compound "Step 1: Installing the application", in the top right corner under configurations.
Once that's finished, run the next compound: "Step 2: run tsc" This compiles the typescript to javascript for your application to work.
Once that is done run the final compound "Afterwards: running the application".
After everything compiles you should be able to view the site on localhost:4200/.<br>
From now on you'll only need to run "Afterwards: running the application" To start our application.

The hard way:<br>
If you don't have webstorm you can enter all comands manually.
First you have to cd into the frontend and run:
"npm install"
then cd ../backend into the backend and run:
"npm install"
then still inside the backend run:
"npm tsc build"<br>
These three steps are inside Step one  and two above, so you only have to do them once.
Now every time you want to view the website, open a terminal and
cd into the backend and run:
"node build/server.js"
Open another terminal, cd into the frontend and run:
"ng serve"
Once both are done, you can view the website at localhost:4200/<br>

this might take around 5 minutes the first time and afterwards around a minute.

<h2>Our features</h2>

<h3>Registration</h3>
We offer a feature where you can register yourself to our App.
To register, hit the menu in the top left corner and select "Register".
You can choose any available username and there are no password restrictions. You have
to confirm your password in a password verification field, to ensure you've selected the 
intended password without any typos
If a user with the same name already exists, or your passwords don't match
you won't be able to register and a text will appear below the input fields informing you
of the issue.
By checking the box below you you can register as a provider in order
to be able to provide services later. You have to enter an e-mail if you choose
to register as a provider.

<h3>Login</h3>
If you already have an account you can hit the login button in the top
right corner, enter your username and password to log in.

<h3>Profile Page</h3>
Registered users can access there profile page, where they see some
information about their account.
All users see name and account type, which can be either customer or provider.
Customers see a list of all the subscribed posts. 
There is a logout button below as well.

Instead of the subscribed posts providers get a list of services they are currently
offering.

<h3>Posting a service</h3>
A logged in provider can post a new service by hitting the menu button
and choosing 'Share your Service'.
The provider can add a title, as well as a description of his service.
In addition he can choose a preset image, that reflects his service type.
Below there is a live preview of the post so the provider can
get an idea what his post is going to look like.
By pressing the 'Post Service' button the post will be added
to our list of posts. A post cannot be submitted with an empty
title or description.

<h3>Home - List of services</h3>
On our Home page all the offered services are listed just waiting to be booked
by one of our customers. You can search through the list using the
search field at the top on the right. To see all the available
services again after you've searched something just hit the refresh button.
The search is case sensitive!

<h3>Post Detail Page</h3>
By clicking on one of the posts you can get a larger view of the post and the contact
details of the service provider for logged in users, without a login a link to the login
page is displayed in place of the email address.

<h3>Subscriptions</h3>
Customers can subscribe to posts. They get a list of all their subscribed
posts in the Profile Page.

<h3>About us</h3>
Visit our About us Page for more information about our team and support
inquiries.

<h3>Dark Mode</h3>
Our whole app can be used in darkmode. You can find a switch in
the menu where you're able to switch between normal and dark mode.

<h2>Testing</h2>

<h3>Unit Testing</h3>
We have implemented some Karma Unit Tests to make sure things are
working as expected.
