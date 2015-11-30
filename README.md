# Automated Workflow #

Framework for automating processes and letting Designers and Developers do what they do best.


### What is this repository for? ###

Starting development on a new project or adding to an existing project? Install now to have a consistent framework with automation.


### What does this repository do? ###

* Automatic Styleguide creation - SC5 styleguide using KSS notation
* Automating CSS Regression Testing - phantomjs, casperjs and backstopjs


### Getting Started ###

```
git clone https://github.com/nilssanderson/automated-workflow.git
```

### Running the Automatic CSS Regression Testing ###

Update the backstop.json file as needed, then
```
cd automated-workflow/bower_components/backstopjs
gulp genConfig
gulp reference
```

Run this after any change to the backstop.json file
```
gulp reference
```

Then to run the tests
```
gulp test
```
