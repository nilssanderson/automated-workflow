# Automated Workflow #

Framework for automating processes and letting Designers and Developers do what they do best.


### What is this repository for? ###

Starting development on a new project or adding to an existing project? Install now to have a consistent framework with automation.


### What does this repository do? ###

* Automatic Styleguide creation - SC5 styleguide using KSS notation
* Automating CSS Regression Testing - phantomjs, casperjs and backstopjs


### Getting Started ###

To get started
```
git clone https://github.com/nilssanderson/automated-workflow.git
cd automated-workflow
npm install
```

Then to build the framework
```
gulp
```

The default task should:

* Build out a static app
* Convert SCSS to CSS
* Generate a SC5 Styleguide based on the SCSS comments
* Open these in the browser for viewing and updating (Styleguide)

### Setting up the Automatic CSS Regression Testing ###

Update the backstop.json file as needed, then
```
bower install backstopjs

cd bower_components/backstopjs
npm install

cd automated-workflow/bower_components/backstopjs
gulp genConfig
gulp reference
```

Run this after any change to the backstop.json file to update the references
```
gulp reference
```

Then to run the tests
```
gulp test
```
